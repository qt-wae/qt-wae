## Hi there 👋

<!--
**qt-wae/qt-wae** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>محلل صور التداول - شراء أو بيع</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 40px;
      background-color: #f0f0f0;
      direction: rtl;
    }
    input[type="file"] {
      margin: 20px 0;
    }
    #preview {
      max-width: 90%;
      max-height: 400px;
      margin: 20px auto;
      border: 2px solid #ccc;
      border-radius: 10px;
      display: none;
    }
    button {
      padding: 10px 25px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    #result {
      margin-top: 30px;
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  </style>
</head>
<body>

  <h1>محلل صور التداول</h1>
  <p>ارفع صورة من التداول وسنخبرك إذا كانت إشارة شراء أو بيع.</p>

  <input type="file" id="imageInput" accept="image/*">
  <br>
  <img id="preview" src="#" alt="معاينة الصورة">
  <br>
  <button onclick="analyzeImage()">تحليل الصورة</button>

  <div id="result"></div>

  <script>
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const result = document.getElementById('result');

    imageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = "block";
          result.innerText = '';
        }
        reader.readAsDataURL(file);
      }
    });

    function analyzeImage() {
      if (!preview.src || preview.style.display === "none") {
        result.innerText = "يرجى رفع صورة أولاً.";
        return;
      }

      result.innerText = "جارٍ تحليل الصورة...";

      setTimeout(() => {
        const signals = [
          "🚀 إشارة شراء محتملة",
          "📉 إشارة بيع محتملة",
          "⏳ لا توجد إشارة واضحة"
        ];
        const randomIndex = Math.floor(Math.random() * signals.length);
        result.innerText = "النتيجة: " + signals[randomIndex];
      }, 2000);
    }
  </script>

</body>
</html>
