"""Rebuild index.html from src/ after editing the engine or the interface.

Usage:  python3 build.py
"""
from pathlib import Path

root = Path(__file__).parent
app = (root / "src/app.html").read_text(encoding="utf-8")
app = app.replace("/*ENGINE*/", (root / "src/engine.js").read_text(encoding="utf-8"))
head, body = app.split("<!--BODY-->", 1)
page = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
    "<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
    "body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n"
    + head.strip() + "\n</head>\n<body>\n" + body.strip() + "\n</body>\n</html>\n"
)
(root / "index.html").write_text(page, encoding="utf-8")
print("Wrote index.html")
