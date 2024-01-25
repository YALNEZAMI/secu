"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repertoire = exports.Fichier = exports.Permission = void 0;
const fs = __importStar(require("fs/promises"));
var Permission;
(function (Permission) {
    Permission["Read"] = "r";
    Permission["Write"] = "w";
    Permission["Exec"] = "x";
    Permission["Sticky"] = "s";
})(Permission || (exports.Permission = Permission = {}));
class Fichier {
    constructor(nom, extension, taille, permissions, //pas exec normalement
    est_lie_a // FsElement est le nom de votre interface créée à la question 1
    ) {
        this.nom = nom;
        this.extension = extension;
        this.taille = taille;
        this.permissions = permissions;
        this.est_lie_a = est_lie_a;
    }
    affiche_est_lie_a() {
        if (this.est_lie_a !== undefined) {
            console.log("lié à :", this.est_lie_a.nom);
        }
    }
    est_etrange() {
        if (this.permissions.includes(Permission.Exec)) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Fichier = Fichier;
class Repertoire {
    constructor(nom, chemin, taille, fsElements, // private directories: Repertoire[],
    permissions //pas exec normalement
    ) {
        this.nom = nom;
        this.chemin = chemin;
        this.taille = taille;
        this.fsElements = fsElements;
        this.permissions = permissions;
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.clone();
        }));
        // this.taille = this.getTaille();
    }
    clone() {
        return __awaiter(this, void 0, void 0, function* () {
            const fsElements = yield fs.readdir(this.chemin);
            for (let fsElement of fsElements) {
                const stat = yield fs.stat(`${this.chemin}/${fsElement}`);
                if (stat.isDirectory()) {
                    const repertoire = new Repertoire(fsElement, `${this.chemin}/${fsElement}`, yield this.getTailleStatic(`${this.chemin}/${fsElement}`), [], [Permission.Read, Permission.Write]);
                    this.fsElements.push(repertoire);
                    yield repertoire.clone();
                }
                else {
                    this.fsElements.push(new Fichier(fsElement, "txt", stat.size, [
                        Permission.Read,
                        Permission.Write,
                    ]));
                }
            }
        });
    }
    getTaille() {
        let taille = 0;
        for (const fsElement of this.fsElements) {
            taille += fsElement.taille;
        }
        return taille;
    }
    getTailleStatic(chemin) {
        return __awaiter(this, void 0, void 0, function* () {
            let taille = 0;
            const fsElements = yield fs.readdir(chemin);
            for (let fsElement of fsElements) {
                const stat = yield fs.stat(`${chemin}/${fsElement}`);
                if (stat.isDirectory()) {
                    taille += yield this.getTailleStatic(`${chemin}/${fsElement}`);
                }
                else {
                    taille += stat.size;
                }
            }
            return taille;
        });
    }
    printFileWithSizeEqualNul() {
        return __awaiter(this, void 0, void 0, function* () {
            const fsElements = yield fs.readdir(this.chemin);
            for (const fsElement of fsElements) {
                const stat = yield fs.stat(`${this.chemin}/${fsElement}`);
                switch (stat.isDirectory()) {
                    case true: //si c'est un dossier
                        const taille = yield this.getTailleStatic(`${this.chemin}/${fsElement}`);
                        if (taille === 0) {
                            console.log(`${this.chemin}/${fsElement} est vide \n`);
                        }
                        else {
                            const repertoire = new Repertoire(fsElement, `${this.chemin}/${fsElement}`, taille, [], [Permission.Read, Permission.Write]);
                            yield repertoire.printFileWithSizeEqualNul();
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
        });
    }
    have_permission_etrange() {
        let permission_etrange = false;
        for (const fsElement of this.fsElements) {
            if (fsElement instanceof Repertoire) {
                for (const permission of fsElement.permissions) {
                    if (!this.permissions.includes(permission)) {
                        permission_etrange = true;
                    }
                    else {
                        permission_etrange = fsElement.have_permission_etrange();
                    }
                }
            }
        }
        return permission_etrange;
    }
}
exports.Repertoire = Repertoire;
// module.exports = {
//   Fichier,
//   Repertoire,
//   Permission,
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRW50aXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBa0M7QUFDbEMsSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ3BCLHdCQUFVLENBQUE7SUFDVix5QkFBVyxDQUFBO0lBQ1gsd0JBQVUsQ0FBQTtJQUNWLDBCQUFZLENBQUE7QUFDZCxDQUFDLEVBTFcsVUFBVSwwQkFBVixVQUFVLFFBS3JCO0FBQ0QsTUFBYSxPQUFPO0lBQ2xCLFlBQ1MsR0FBVyxFQUNWLFNBQWlCLEVBQ2xCLE1BQWMsRUFDYixXQUF5QixFQUFFLHNCQUFzQjtJQUNqRCxTQUFxQixDQUFDLGdFQUFnRTs7UUFKdkYsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNWLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNiLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDNUIsQ0FBQztJQUNKLGlCQUFpQjtRQUNmLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXBCRCwwQkFvQkM7QUFDRCxNQUFhLFVBQVU7SUFDckIsWUFDUyxHQUFXLEVBQ1gsTUFBYyxFQUNkLE1BQWMsRUFDYixVQUF1QixFQUFFLHFDQUFxQztJQUM5RCxXQUF5QixDQUFDLHNCQUFzQjs7UUFKakQsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2IsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUN2QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUVqQyxVQUFVLENBQUMsR0FBUyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDSCxrQ0FBa0M7SUFDcEMsQ0FBQztJQUVLLEtBQUs7O1lBQ1QsTUFBTSxVQUFVLEdBQVUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RCxLQUFLLElBQUksU0FBUyxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7b0JBQ3ZCLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUMvQixTQUFTLEVBQ1QsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRSxFQUU3QixNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDLEVBQ3pELEVBQUUsRUFDRixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUNwQyxDQUFDO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQyxNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ3ZDLFVBQVUsQ0FBQyxJQUFJO3dCQUNmLFVBQVUsQ0FBQyxLQUFLO3FCQUNqQixDQUFDLENBQ0gsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtJQUNELFNBQVM7UUFDUCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixLQUFLLE1BQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN4QyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVLLGVBQWUsQ0FBQyxNQUFjOztZQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixNQUFNLFVBQVUsR0FBVSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkQsS0FBSyxJQUFJLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7b0JBQ3ZCLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDakUsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QixDQUFDO1lBQ0gsQ0FBQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNLLHlCQUF5Qjs7WUFDN0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBRTFELFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7b0JBQzNCLEtBQUssSUFBSSxFQUFFLHFCQUFxQjt3QkFDOUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUN2QyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFLENBQzlCLENBQUM7d0JBQ0YsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsY0FBYyxDQUFDLENBQUM7d0JBQ3pELENBQUM7NkJBQU0sQ0FBQzs0QkFDTixNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FDL0IsU0FBUyxFQUNULEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUUsRUFDN0IsTUFBTSxFQUNOLEVBQUUsRUFDRixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUNwQyxDQUFDOzRCQUNGLE1BQU0sVUFBVSxDQUFDLHlCQUF5QixFQUFFLENBQUM7d0JBQy9DLENBQUM7d0JBQ0QsTUFBTTtvQkFDUixLQUFLLEtBQUssRUFBRSxxQkFBcUI7d0JBQy9CLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQzs0QkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxlQUFlLENBQUMsQ0FBQzt3QkFDMUQsQ0FBQzt3QkFDRCxNQUFNO29CQUVSO3dCQUNFLE1BQU07Z0JBQ1YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7SUFDRCx1QkFBdUI7UUFDckIsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsSUFBSSxTQUFTLFlBQVksVUFBVSxFQUFFLENBQUM7Z0JBQ3BDLEtBQUssTUFBTSxVQUFVLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDM0Msa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUM1QixDQUFDO3lCQUFNLENBQUM7d0JBQ04sa0JBQWtCLEdBQUcsU0FBUyxDQUFDLHVCQUF1QixFQUFFLENBQUM7b0JBQzNELENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUE5R0QsZ0NBOEdDO0FBTUQscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLEtBQUsifQ==