import { UcDefaultConfig } from "uc-runtime/core-main.js";
 
export default UcDefaultConfig({
    guid: "e88aa70c-55a2-452f-ba44-e28f2bca81ba", 
    cli:{
        useElectron: false, 
        useTypeScript: true, 
        codeFileExt: ".ts", 
        outputFileExt: ".js", 
        designerDir: "designerFiles",
        srcDir: "src", 
        outDir: "out", 
        
        ResourceStorageFile: "designerFiles/Resources.ts", 
        ResourceStorageDir:'out/designerFiles/files',
        baseCssPath: "styles.scss",
        mainProcessFilePath:"",
        preloadScriptFilePath:"",
        devtools:true,
        removeMenu:true,
    },
    browser: {
        resolveProjects: [  "uc-runtime",  "uc-dev",  ],
        importmap: {
            
        },       
    },
    projectBaseCssPath: "",   
    preference: {
        build: { 
            ignorePath: [  "node_modules",  ".git",  ".vscode",  "out",  ],
            RuntimeResources: [
                {
                    includeExtensions: [  ".jpg",  ".png",  ".html",  ".scss",  ".ico",  ".svg",  ],
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
                fileDeclaration:  { code :  {  extension : '.ts',  } ,
    designer :  {  extension : '.designer.ts',  } ,
     } 
            },
            out: {
                /* 
                i.e
                ./[out]/lib/file.uc.js     =>    ./out/lib/file.uc.js  
                ./[]/lib/file.uc.html     =>    ./lib/file.uc.html
                */
                dirPath: 'out',
                fileDeclaration:   { code :  {  extension : '.js',  } ,
    designer :  {  extension : '.designer.js',  } ,
     } 
            }
        }, 
         /**
         * A common Declaration  for all declarations specified in `dirDeclaration` 
         * (i.e src,out)
         */
        fileCommonDeclaration:  { designer :  {  subDirPath : 'designerFiles',  } ,
    scss :  {  extension : '.scss',  } ,
    html :  {  extension : '.html',  } ,
     } ,        
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
