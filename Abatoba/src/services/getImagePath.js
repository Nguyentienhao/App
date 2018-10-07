import env from "../configs/env";

export default function getImagePath(tenfile){
    var img_path = env.site_url;
    var folder = tenfile.substr(0,3);
    var subfolder = tenfile.substr(3,3);
    img_path = img_path.concat('/Assets/Upload/Files/',folder,'/',subfolder,'/',tenfile);
    return img_path;
}