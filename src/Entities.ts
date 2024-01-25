import * as fs from "fs/promises";
export enum Permission {
  Read = "r",
  Write = "w",
  Exec = "x",
  Sticky = "s",
}
export class Fichier implements FsElement {
  constructor(
    public nom: string,
    private extension: string,
    public taille: number,
    private permissions: Permission[], //pas exec normalement
    private est_lie_a?: FsElement // FsElement est le nom de votre interface créée à la question 1
  ) {}
  affiche_est_lie_a(): void {
    if (this.est_lie_a !== undefined) {
      console.log("lié à :", this.est_lie_a.nom);
    }
  }
  est_etrange(): boolean {
    if (this.permissions.includes(Permission.Exec)) {
      return true;
    } else {
      return false;
    }
  }
}
export class Repertoire implements FsElement {
  constructor(
    public nom: string,
    public chemin: string,
    public taille: number,
    private fsElements: FsElement[], // private directories: Repertoire[],
    private permissions: Permission[] //pas exec normalement
  ) {
    setTimeout(async () => {
      await this.clone();
    });
    // this.taille = this.getTaille();
  }

  async clone(): Promise<void> {
    const fsElements: any[] = await fs.readdir(this.chemin);
    for (let fsElement of fsElements) {
      const stat = await fs.stat(`${this.chemin}/${fsElement}`);
      if (stat.isDirectory()) {
        const repertoire = new Repertoire(
          fsElement,
          `${this.chemin}/${fsElement}`,

          await this.getTailleStatic(`${this.chemin}/${fsElement}`),
          [],
          [Permission.Read, Permission.Write]
        );
        this.fsElements.push(repertoire);
        await repertoire.clone();
      } else {
        this.fsElements.push(
          new Fichier(fsElement, "txt", stat.size, [
            Permission.Read,
            Permission.Write,
          ])
        );
      }
    }
  }
  getTaille(): number {
    let taille = 0;
    for (const fsElement of this.fsElements) {
      taille += fsElement.taille;
    }
    return taille;
  }

  async getTailleStatic(chemin: string) {
    let taille = 0;
    const fsElements: any[] = await fs.readdir(chemin);

    for (let fsElement of fsElements) {
      const stat = await fs.stat(`${chemin}/${fsElement}`);
      if (stat.isDirectory()) {
        taille += await this.getTailleStatic(`${chemin}/${fsElement}`);
      } else {
        taille += stat.size;
      }
    }
    return taille;
  }
  async printFileWithSizeEqualNul() {
    const fsElements = await fs.readdir(this.chemin);
    for (const fsElement of fsElements) {
      const stat = await fs.stat(`${this.chemin}/${fsElement}`);

      switch (stat.isDirectory()) {
        case true: //si c'est un dossier
          const taille = await this.getTailleStatic(
            `${this.chemin}/${fsElement}`
          );
          if (taille === 0) {
            console.log(`${this.chemin}/${fsElement} est vide \n`);
          } else {
            const repertoire = new Repertoire(
              fsElement,
              `${this.chemin}/${fsElement}`,
              taille,
              [],
              [Permission.Read, Permission.Write]
            );
            await repertoire.printFileWithSizeEqualNul();
          }
          break;
        case false: //si c'est un fichier
          if (stat.size === 0) {
            console.log(`${this.chemin}/${fsElement}  est vide \n`);
          }
          break;

        default:
          break;
      }
    }
  }
  have_permission_etrange(): boolean {
    let permission_etrange = false;
    for (const fsElement of this.fsElements) {
      if (fsElement instanceof Repertoire) {
        for (const permission of fsElement.permissions) {
          if (!this.permissions.includes(permission)) {
            permission_etrange = true;
          } else {
            permission_etrange = fsElement.have_permission_etrange();
          }
        }
      }
    }
    return permission_etrange;
  }
}
interface FsElement {
  nom: string;
  readonly taille: number;
}

// module.exports = {
//   Fichier,
//   Repertoire,
//   Permission,
// };
