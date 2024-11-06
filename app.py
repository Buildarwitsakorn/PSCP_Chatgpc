from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# รายการบอร์ดเกม
board_games = [
    "7 ATE 9", "AQUARIUS", "AVALON", "AZUL", "BANG",
    "BANG GOLD RUSH", "CAPTAIN SONAR", "CENTURY SPICE ROAD", "CITADELS", "COUP",
    "CS FILES","DEAD OF WINTER","DOMINION","DRAGON CASTLE","EXPLODING KITTENS",
    "GIZMOS","KAKER LAKEN POKER","ONE NIGHT","PANDEMIC","POWER GRID",
    "SALEM","TERRAFORMING MARS","SERIAL KILLER","THE MIND","TIME LINE","Political Mess",
    "UNO","CATAN","Ultimate Werewolf Deluxe","สนุก สลัด","หมากรุก","หมากล้อม","JUNGLE SPEED"
]

@app.route('/')
def index():
    # ข้อความสำหรับอธิบายเว็บไซต์
    message = """เว็บไซต์นี้จัดทำขึ้นเพื่ออำนวยความสะดวกให้นักศึกษาแผนก IT ที่สนใจในการเล่นบอร์ดเกม โดยเป็นพื้นที่ที่ช่วยให้การผ่อนคลายและสร้างปฏิสัมพันธ์ระหว่างเพื่อน ๆ 
    ผ่านการเล่นเกมที่สนุกและท้าทาย บอร์ดเกมเป็นกิจกรรมที่ไม่เพียงช่วยคลายเครียด แต่ยังพัฒนาทักษะสำคัญที่เป็นประโยชน์ต่อการเรียนด้าน IT เช่น การวางแผนเชิงกลยุทธ์ การแก้ปัญหาอย่างเป็นระบบ 
    และการทำงานร่วมกันในทีม
    เว็บไซต์นี้รวบรวมรีวิวและข้อมูลบอร์ดเกมที่เหมาะสำหรับนักศึกษา IT ทุกระดับ ตั้งแต่เกมพื้นฐานไปจนถึงเกมที่ซับซ้อน 
    ทำให้คุณสามารถเลือกเกมที่เหมาะกับความสนใจและเวลาของคุณ อีกทั้งยังเป็นแหล่งพบปะและแลกเปลี่ยนความรู้กับเพื่อน ๆ ในแผนก IT ที่มีความชอบในบอร์ดเกมเช่นเดียวกัน"""
    return render_template('Front-Board Game.html', message=message)

@app.route('/search', methods=["GET"])
#เอาไว้สำหรับพัฒนาต่อเมื่อต้องการทำ fetch
def search():
    # รับคำค้นหาจาก query string
    query = request.args.get('q', '')

    # ค้นหาบอร์ดเกมที่ตรงหรือใกล้เคียงกับคำค้นหา โดยไม่สนใจตัวพิมพ์เล็ก/ใหญ่
    results = [game for game in board_games if query.lower() in game.lower()]

    # ส่งผลลัพธ์เป็น JSON กลับไปยัง JavaScript ที่ฝั่ง frontend
    return jsonify({'results': results})

if __name__ == '__main__':
    # รันเซิร์ฟเวอร์ Flask บนพอร์ต 5500
    app.run(debug=True, port=5500)