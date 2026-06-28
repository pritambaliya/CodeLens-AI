import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudanary.config.js";
import path from "path";


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "codeLens",
    resource_type: "auto"
  }
});

const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", 
    ".c", ".cpp", ".h", ".hpp", ".cs", ".java", ".class", ".kt", ".kts",
    ".py", ".pyw", ".rb", ".swift", ".go", ".rs", ".dart", ".m", ".mm",
    ".php", ".phtml", ".asp", ".aspx", ".jsp", ".ts", ".tsx", ".js", ".jsx",
    ".scala", ".groovy", ".pl", ".pm", ".lua", ".r", ".jl", ".vb", ".vbs",
    ".sh", ".bash", ".zsh", ".bat", ".cmd", ".ps1",
    ".html", ".htm", ".xhtml", ".xml", ".svg", ".css", ".scss", ".sass", ".less",
    ".json", ".yaml", ".yml", ".toml", ".ini", ".csv", ".tsv",
    ".sql", ".db", ".md", ".markdown", ".tex", ".bib", ".gradle", ".make", ".mk",
    ".ejs", ".hbs", ".pug", ".twig", ".liquid",
    ".wasm", ".asm", ".s", ".clj", ".cljs", ".erl", ".ex", ".exs"];


const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },

  fileFilter:(req,file,cb)=>{
    const ext = path
      .extname(file.originalname)
      .toLowerCase();

    if(allowedExtensions.includes(ext)){
      cb(null,true);
    }else{
      cb(
        new Error(
          "Only code files, JPG, PNG, PDF are allowed"
        ),
        false
      );
    }
  }
});

export default upload;