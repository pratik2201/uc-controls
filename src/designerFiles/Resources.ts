import { UserResource, ResourceStorage, Assembly, AssemblyManager } from "uc-runtime/core-main.js";

declare module "uc-runtime/core-main" {
   export interface ResourceNamedRegistry{
      
   }

   export interface TPPackage {
        
   }

   
   export interface AssemblyRegistry{
        "uc-controls" : Assembly
   }
   export interface ResourceKeyRegistry {
        "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000000": "",
        "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000001": "uc-controls\\styles.scss",
        "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000002": "",
        "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000003": "uc-controls\\src\\WinFrame.uc.html",
        "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000004": "uc-controls\\src\\WinFrame.uc.scss",
        
   }
}
const Resources:UserResource[] = [

    {   guid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000000",   project: "uc-controls",  source: "",   type: "string",  encrypt:false,   content: "{\"imports\":{},\"scopes\":{\"./\":{\"uc-runtime/core.js\":\"./node_modules/uc-runtime/dist/core.js\",\"uc-runtime/core-main.js\":\"./node_modules/uc-runtime/dist/core-main.js\",\"uc-runtime/package.json\":\"./node_modules/uc-runtime/package.json\",\"uc-runtime/designerFiles/Resources.js\":\"./node_modules/uc-runtime/dist/designerFiles/Resources.js\"}}}"  }, 
    {   guid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000001",   project: "uc-controls",  source: "uc-controls\\styles.scss",   type: "css",  encrypt:false,   content: ""  }, 
    {   guid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000002",   project: "uc-controls",  source: "",   type: "string",  encrypt:false,   content: "{\"cli\":{\"useElectron\":true,\"useTypeScript\":true,\"baseCssPath\":\"styles.scss\",\"devtools\":true,\"removeMenu\":true,\"ResourceStorageFile\":\"designerFiles/Resources.ts\"},\"guid\":\"ed24c044-c04d-4a5b-9a24-0f77b14ddfda\",\"browser\":{\"resolveProjects\":[\"uc-runtime\",\"uc-dev\"],\"importmap\":{\"uc-runtime/core.js\":\"node_modules/uc-runtime/dist/core.js\",\"uc-runtime/core-main.js\":\"node_modules/uc-runtime/dist/core-main.js\",\"uc-runtime/package.json\":\"node_modules/uc-runtime/package.json\",\"uc-runtime/designerFiles/Resources.js\":\"node_modules/uc-runtime/dist/designerFiles/Resources.js\"},\"baseCssPath\":\"styles.scss\"},\"preference\":{\"build\":{\"guidOptions\":{\"guidType\":\"sequenceAndSameGuid\",\"sequencePadSize\":8},\"ignorePath\":[\"node_modules\",\".git\",\".vscode\",\"out\"],\"RuntimeResources\":[{\"includeExtensions\":[\".jpg\",\".png\",\".html\",\".scss\",\".ico\",\".svg\"],\"fromDeclare\":\"src\",\"toDeclares\":[\"out\"]}],\"ResourceStorageFile\":\"designerFiles/Resources.ts\"},\"dirDeclaration\":{\"src\":{\"dirPath\":\"src\",\"fileDeclaration\":{\"code\":{\"extension\":\".ts\",\"subDirPath\":\"\"},\"designer\":{\"extension\":\".designer.ts\",\"subDirPath\":\"designerFiles\"},\"scss\":{\"subDirPath\":\"\",\"extension\":\".scss\"},\"html\":{\"subDirPath\":\"\",\"extension\":\".html\"}}},\"out\":{\"dirPath\":\"out\",\"fileDeclaration\":{\"code\":{\"extension\":\".js\",\"subDirPath\":\"\"},\"designer\":{\"extension\":\".designer.js\",\"subDirPath\":\"designerFiles\"},\"scss\":{\"subDirPath\":\"\",\"extension\":\".scss\"},\"html\":{\"subDirPath\":\"\",\"extension\":\".html\"}}}},\"fileCommonDeclaration\":{\"designer\":{\"subDirPath\":\"designerFiles\"},\"scss\":{\"extension\":\".scss\",\"subDirPath\":\"\"},\"html\":{\"extension\":\".html\",\"subDirPath\":\"\"}},\"srcDec\":\"src\",\"outDec\":\"out\"},\"encryptResource\":false,\"useTypeScript\":true,\"projectBaseCssPath\":\"\"}"  }, 
    {   guid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000003",   project: "uc-controls",  source: "uc-controls\\src\\WinFrame.uc.html",   type: "html",  encrypt:false,   content: "<WRAPPER x-caption=\"Frame\">\r\n  <MAIN-CONTAINER>\r\n    <TITLE-BAR x-name=\"titlebar1\">\r\n      <TITLE-TEXT x-name=\"lbl_title\">TITLE</TITLE-TEXT>\r\n      <div class=\"win-buttons\">\r\n        <ICON-BUTTON x-name=\"cmd_restore\">🗗</ICON-BUTTON>\r\n        <ICON-BUTTON x-name=\"cmd_max\">🗖</ICON-BUTTON>\r\n        <ICON-BUTTON x-name=\"cmd_close\">╳</ICON-BUTTON>\r\n      </div>\r\n    </TITLE-BAR>\r\n    <CONTAINER x-name=\"container1\"></CONTAINER>\r\n  </MAIN-CONTAINER>\r\n</WRAPPER>\r\n"  }, 
    {   guid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000004",   project: "uc-controls",  source: "uc-controls\\src\\WinFrame.uc.scss",   type: "css",  encrypt:false,   content: "$i-UC_WIN_TITLE_BACK:#124559;$i-UC_WIN_TITLE_FORE:#ffd60a;$i-UC_WIN_BORDER_FILL:#0c3a4c;&{position:relative;display:block;width:100%;height:100%;box-shadow:3px 3px 2px 0px #00000075;}main-container{width:100%;height:100%;border:solid 1px black;display:grid;grid-template-rows:max-content auto;}title-bar{width:inherit;display:grid;background-color:$i-UC_WIN_TITLE_BACK;grid-template-columns:auto max-content;}title-text{padding:4px;display:block;width:100%;}.win-buttons{display:flex;}icon-button{display:block;width:30px;text-align:center;background-color:$i-UC_WIN_BORDER_FILL;}title-text,icon-button{font-weight:bold;color:$i-UC_WIN_TITLE_FORE;}icon-button:hover{background-color:$i-UC_WIN_TITLE_BACK;}icon-close{display:block;background-color:$i-UC_WIN_BORDER_FILL;}container{border-right:solid 4px $i-UC_WIN_BORDER_FILL;border-left:solid 4px $i-UC_WIN_BORDER_FILL;border-bottom:solid 4px $i-UC_WIN_BORDER_FILL;overflow:hidden;}"  }, 
];
ResourceStorage.bulkRegister(Resources);

ResourceStorage.RuntimeProps['importmap'] = ResourceStorage.RuntimeProps['importmap'] ?? ResourceStorage.getContent("uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000000");


AssemblyManager.Register({
     name: "uc-controls",
     guid: "ed24c044-c04d-4a5b-9a24-0f77b14ddfda",
     cssGuid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000001",
     ucConfigGuid: "uc-controls:ed24c044-c04d-4a5b-9a24-0f77b14ddfda:00000002"
});
