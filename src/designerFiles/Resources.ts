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
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000000": "",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000001": "uc-controls\\styles.scss",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000002": "",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003": "uc-controls\\src\\RecycleView.uc.html",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004": "uc-controls\\src\\RecycleView.uc.scss",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000005": "uc-controls\\src\\WinFrame.uc.html",
        "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006": "uc-controls\\src\\WinFrame.uc.scss",
        
   }
}
const Resources:UserResource[] = [

    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000000",   project: "uc-controls",  source: "",   type: "string",  encrypt:false,   content: "{\"imports\":{},\"scopes\":{\"./\":{\"uc-runtime/core.js\":\"../uc-runtime/dist/core.js\",\"uc-runtime/core-main.js\":\"../uc-runtime/dist/core-main.js\",\"uc-runtime/package.json\":\"../uc-runtime/package.json\",\"uc-runtime/designerFiles/Resources.js\":\"../uc-runtime/dist/designerFiles/Resources.js\"},\"../uc-runtime/\":{\"core.js\":\"../uc-runtime/dist/core.js\",\"core-main.js\":\"../uc-runtime/dist/core-main.js\",\"package.json\":\"../uc-runtime/package.json\",\"designerFiles/Resources.js\":\"../uc-runtime/dist/designerFiles/Resources.js\"}}}"  }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000001",   project: "uc-controls",  source: "uc-controls\\styles.scss",   type: "css",  encrypt:false,   content: ""  }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000002",   project: "uc-controls",  source: "",   type: "string",  encrypt:false,   content: "{\"cli\":{\"useElectron\":false,\"useTypeScript\":true,\"codeFileExt\":\".ts\",\"outputFileExt\":\".js\",\"designerDir\":\"designerFiles\",\"srcDir\":\"src\",\"outDir\":\"out\",\"baseCssPath\":\"styles.scss\",\"devtools\":true,\"removeMenu\":true,\"ResourceStorageFile\":\"designerFiles/Resources.ts\",\"preloadScriptFilePath\":\"\",\"mainProcessFilePath\":\"\"},\"guid\":\"e88aa70c-55a2-452f-ba44-e28f2bca81ba\",\"browser\":{\"resolveProjects\":[\"uc-runtime\",\"uc-dev\"],\"importmap\":{\"uc-runtime/core.js\":\"../uc-runtime/dist/core.js\",\"uc-runtime/core-main.js\":\"../uc-runtime/dist/core-main.js\",\"uc-runtime/package.json\":\"../uc-runtime/package.json\",\"uc-runtime/designerFiles/Resources.js\":\"../uc-runtime/dist/designerFiles/Resources.js\"}},\"preference\":{\"build\":{\"guidOptions\":{\"guidType\":\"sequenceAndSameGuid\",\"sequencePadSize\":8},\"ignorePath\":[\"node_modules\",\".git\",\".vscode\",\"out\"],\"RuntimeResources\":[{\"includeExtensions\":[\".jpg\",\".png\",\".html\",\".scss\",\".ico\",\".svg\"],\"fromDeclare\":\"src\",\"toDeclares\":[\"out\"]}]},\"dirDeclaration\":{\"src\":{\"dirPath\":\"src\",\"fileDeclaration\":{\"code\":{\"extension\":\".ts\",\"subDirPath\":\"\"},\"designer\":{\"extension\":\".designer.ts\",\"subDirPath\":\"designerFiles\"},\"scss\":{\"subDirPath\":\"\",\"extension\":\".scss\"},\"html\":{\"subDirPath\":\"\",\"extension\":\".html\"}}},\"out\":{\"dirPath\":\"out\",\"fileDeclaration\":{\"code\":{\"extension\":\".js\",\"subDirPath\":\"\"},\"designer\":{\"extension\":\".designer.js\",\"subDirPath\":\"designerFiles\"},\"scss\":{\"subDirPath\":\"\",\"extension\":\".scss\"},\"html\":{\"subDirPath\":\"\",\"extension\":\".html\"}}}},\"fileCommonDeclaration\":{\"designer\":{\"subDirPath\":\"designerFiles\"},\"scss\":{\"extension\":\".scss\",\"subDirPath\":\"\"},\"html\":{\"extension\":\".html\",\"subDirPath\":\"\"}},\"srcDec\":\"src\",\"outDec\":\"out\"},\"encryptResource\":false,\"projectBaseCssPath\":\"\"}"  }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000003",   project: "uc-controls",  source: "uc-controls\\src\\RecycleView.uc.html",   type: "html",  encrypt:false,   content: "<WRAPPER x-caption=\"SimpleView\" x-at=\"src\\util\\controls\\SimpleView.uc.html\" tabindex=\"0\">\r\n  <SCROLL-TEXT role=\"begin\" x-name=\"topIndicator\">&#11165; </SCROLL-TEXT>\r\n  <PAGECNTNR x-name=\"viewport\" x-tabindex=\"0\">\r\n    <TBL x-name=\"rowContainer\" tabindex=\"-1\" x-tabindex=\"0\"></TBL>\r\n  </PAGECNTNR>\r\n  <SCROLL-TEXT role=\"end\" x-name=\"bottomIndicator\">   </SCROLL-TEXT>\r\n  <VSCROLLBAR dir=\"v\" x-name=\"vscrollbar1\"></VSCROLLBAR>  \r\n</WRAPPER>"  }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000004",   project: "uc-controls",  source: "uc-controls\\src\\RecycleView.uc.scss",   type: "css",  encrypt:false,   content: "$i-LISTVIEW_BACK:transparent;&{box-sizing:border-box;position:relative;overflow:hidden;display:grid;grid-template-columns:auto max-content;grid-template-rows:max-content minmax(auto,100%) max-content;background-color:$i-LISTVIEW_BACK transparent --;}hscrollbar,vscrollbar{position:relative;display:block;width:11px;height:11px;}vscrollbar{height:100%;overflow-y:auto;position:absolute;right:0px;top:0px;bottom:0px;grid-column:2;grid-row:1 / span 3;}vscrollbar sizer,hscrollbar sizer{position:absolute;width:100%;height:100%;display:block;position:absolute;}scroll-text[role=\"begin\"]{grid-column:1;grid-row:1;margin-left:5px;}pagecntnr{grid-column:1;grid-row:2;}scroll-text[role=\"end\"]{grid-column:1;grid-row:3;text-align:right;margin-right:5px;}scrollbar{position:relative;height:100%;top:0px !important;left:0px !important;right:0px !important;bottom:0px !important;border-radius:0px;}pagecntnr{overflow:hidden;position:relative;width:100%;height:100%;max-width:100%;max-height:100%;display:inline-grid;box-sizing:border-box;}tbl{width:100%;height:max-content;box-sizing:border-box;display:inline-block;grid-auto-rows:max-content;align-self:flex-start;}"  }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000005",   project: "uc-controls",  source: "uc-controls\\src\\WinFrame.uc.html",   type: "html",  encrypt:false,   content: "<WRAPPER x-caption=\"Frame\">\r\n  <MAIN-CONTAINER>\r\n    <TITLE-BAR x-name=\"titlebar1\">\r\n      <TITLE-TEXT x-name=\"lbl_title\">TITLE</TITLE-TEXT>\r\n      <div class=\"win-buttons\">\r\n        <ICON-BUTTON x-name=\"cmd_restore\">🗗</ICON-BUTTON>\r\n        <ICON-BUTTON x-name=\"cmd_max\">🗖</ICON-BUTTON>\r\n        <ICON-BUTTON x-name=\"cmd_close\">╳</ICON-BUTTON>\r\n      </div>\r\n    </TITLE-BAR>\r\n    <CONTAINER x-name=\"container1\"></CONTAINER>\r\n  </MAIN-CONTAINER>\r\n</WRAPPER>\r\n"  }, 
    {   guid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000006",   project: "uc-controls",  source: "uc-controls\\src\\WinFrame.uc.scss",   type: "css",  encrypt:false,   content: "$i-UC_WIN_TITLE_BACK:#124559;$i-UC_WIN_TITLE_FORE:#ffd60a;$i-UC_WIN_BORDER_FILL:#0c3a4c;&{position:relative;display:block;width:100%;height:100%;box-shadow:3px 3px 2px 0px #00000075;}main-container{width:100%;height:100%;border:solid 1px black;display:grid;grid-template-rows:max-content auto;}title-bar{width:inherit;display:grid;background-color:$i-UC_WIN_TITLE_BACK;grid-template-columns:auto max-content;}title-text{padding:4px;display:block;width:100%;}.win-buttons{display:flex;}icon-button{display:block;width:30px;text-align:center;background-color:$i-UC_WIN_BORDER_FILL;}title-text,icon-button{font-weight:bold;color:$i-UC_WIN_TITLE_FORE;}icon-button:hover{background-color:$i-UC_WIN_TITLE_BACK;}icon-close{display:block;background-color:$i-UC_WIN_BORDER_FILL;}container{border-right:solid 4px $i-UC_WIN_BORDER_FILL;border-left:solid 4px $i-UC_WIN_BORDER_FILL;border-bottom:solid 4px $i-UC_WIN_BORDER_FILL;overflow:hidden;}"  }, 
];
ResourceStorage.bulkRegister(Resources);

ResourceStorage.RuntimeProps['importmap'] = ResourceStorage.RuntimeProps['importmap'] ?? ResourceStorage.getContent("uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000000");

await import("uc-runtime/designerFiles/Resources.js");

AssemblyManager.Register({
     name: "uc-controls",
     guid: "e88aa70c-55a2-452f-ba44-e28f2bca81ba",
     cssGuid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000001",
     ucConfigGuid: "uc-controls:e88aa70c-55a2-452f-ba44-e28f2bca81ba:00000002"
});
