
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze_chart(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    green = 0
    red = 0
    pixels = image.convert("RGB").getdata()

    for pixel in pixels:
        r, g, b = pixel
        if g > r and g > b:
            green += 1
        elif r > g and r > b:
            red += 1

    signal = "buy" if green > red else "sell"
    trend = "up" if green > red * 1.1 else "down"

    return {
        "signal": signal,
        "trend": trend
    }
