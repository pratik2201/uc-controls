import { UcDefaultConfig } from "uc-runtime/core-main.js";

export default UcDefaultConfig({
    useTypeScript: true,
    guid: "ed24c044-c04d-4a5b-9a24-0f77b14ddfda",
    cli: {
        ResourceStorageFile: 'designerFiles/Resources.ts', 
        
    },
    browser: {
        resolveProjects: ["uc-runtime", "uc-dev",],
        importmap: {

        },
        baseCssPath: "styles.scss"
    },
    projectBaseCssPath: "",
    preference: {
        build: {
            ResourceStorageFile: "designerFiles/Resources.ts",
            ignorePath: ["node_modules", ".git", ".vscode", "out",],
            RuntimeResources: [
                {
                    includeExtensions: [".jpg", ".png", ".html", ".scss", ".ico", ".svg",],
                    fromDeclare: "src",
                    toDeclares: ["out"]
                }
            ],
            guidOptions: {
                guidType: "sequenceAndSameGuid",
                sequencePadSize: 8,
            }
        },

        dirDeclaration: {
            src: {
                /* 
                i.e
                ./[src]/lib/file.uc.ts     =>    ./src/lib/file.uc.ts  
                ./[]/lib/file.uc.html     =>    ./lib/file.uc.html
                */
                dirPath: 'src',
                /**
                 *  i.e 
                 * dirDeclaration.src.dirpath = 'src';
                 * dirDeclaration.src.fileDeclaration.subDirPath = 'designerFiles';
                 *
                 * ./[src]/[designerFiles]/lib/file.uc.designer.ts     =>    ./src/designerFiles/lib/file.uc.designer.ts
                 * ./[src]/[]/lib/file.uc.ts     =>    ./src/lib/file.uc.ts
                 *
                 * dirDeclaration.src.fileDeclaration.subDirPath = ''
                 * ./[src]/[]/lib/file.uc.ts     =>    ./src/lib/file.uc.ts
                 *
                 * dirDeclaration.src.fileDeclaration.subDirPath = 'htmlFiles'
                 * ./[src]/[htmlFiles]/lib/file.uc.designer.ts     =>    ./src/htmlFiles/lib/file.uc.designer.ts
                 *   
                 *  Same for out declaration 
                 */
                fileDeclaration: {
                    code: { extension: '.ts', },
                    designer: { extension: '.designer.ts', },
                }
            },
            out: {
                /* 
                i.e
                ./[out]/lib/file.uc.js     =>    ./out/lib/file.uc.js  
                ./[]/lib/file.uc.html     =>    ./lib/file.uc.html
                */
                dirPath: 'out',
                fileDeclaration: {
                    code: { extension: '.js', },
                    designer: { extension: '.designer.js', },
                }
            }
        },
        /**
        * A common Declaration  for all declarations specified in `dirDeclaration` 
        * (i.e src,out)
        */
        fileCommonDeclaration: {
            designer: { subDirPath: 'designerFiles', },
            scss: { extension: '.scss', },
            html: { extension: '.html', },
        },
        /**
         * specify dirDeclaration key for source
         */
        srcDec: "src",
        /**
         * specify dirDeclaration key for output
         */
        outDec: "out"
    },
});
