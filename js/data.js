/**
 * TKO Life Remaining Strategy Plan — ข้อมูลเริ่มต้น
 * แก้ไขเนื้อหาทั้งหมดได้ที่ไฟล์นี้ไฟล์เดียว
 * (ค่าที่ผู้ใช้ปรับในหน้าเว็บจะถูกเก็บใน localStorage และทับค่าเหล่านี้
 *  กดปุ่ม "รีเซ็ต" ท้ายหน้าเพื่อกลับมาใช้ค่าในไฟล์นี้)
 */
const DEFAULT_DATA = {
  version: 1,

  profile: {
    title: 'TKO Life Remaining Strategy Plan',
    subtitle: 'แผนยุทธศาสตร์ชีวิต 50 → 65 ปี (2024 - 2039)',
    headerGoals: [
      { label: 'เป้าหมายเกษียณ', value: 'อายุ 55 (5 ปี)', tone: 'green' },
      { label: 'ทำงานต่อเนื่อง', value: 'อายุ 65+ ปี', tone: 'blue' }
    ]
  },

  stats: [
    {
      label: 'วัยปัจจุบัน', value: '50 ปี', icon: 'user', tone: 'blue', valueTone: 'white',
      progress: { label: 'ระยะทางถึง 65 ปี', percent: 33.3 }
    },
    {
      label: 'เป้าหมายหนี้ผ่อนบ้าน', value: '≤ 20,000 ฿/ม.', icon: 'wallet', tone: 'green',
      sub: 'รายได้หลังเกษียณ: 35k - 40k ฿/เดือน'
    },
    {
      label: 'เป้าหมายสุขภาพ', value: 'น้ำหนัก ≤ 80 kg', icon: 'heart', tone: 'red',
      sub: 'น้ำตาล ≤ 120 | ลดยาเบาหวาน 100%'
    },
    {
      label: 'ธุรกิจ AI/IoT + โคกหนองนา', value: 'เตรียมพร้อมก่อน 53 ปี', icon: 'chip', tone: 'purple',
      sub: 'เริ่มธุรกิจล่วงหน้าอย่างน้อย 2 ปี'
    }
  ],

  // ค่าติดตามรายสัปดาห์
  // familyHours = ชั่วโมง Quality Time กับครอบครัว, learnHours = ชั่วโมงเรียนรู้
  // debt = ยอดหนี้คงเหลือ (ใส่หรือไม่ก็ได้)
  metrics: [
    { label: 'สัปดาห์ 1', weight: 84.5, sugar: 135, familyHours: 4, learnHours: 3, debt: null },
    { label: 'สัปดาห์ 2', weight: 83.8, sugar: 130, familyHours: 5, learnHours: 4, debt: null },
    { label: 'สัปดาห์ 3', weight: 83.0, sugar: 125, familyHours: 6, learnHours: 5, debt: null },
    { label: 'สัปดาห์ 4', weight: 82.2, sugar: 122, familyHours: 6, learnHours: 6, debt: null }
  ],

  // category: financial | career | health | family
  okrs: [
    {
      id: 'fin-debt', category: 'financial', target: 2029, progress: 60,
      title: 'ปลดหนี้สินคงค้าง ให้เหลือเพียงค่าบ้าน ≤ 20,000 บาท/เดือน',
      keyResults: [
        'จ่ายชำระหนี้ระยะสั้นทั้งหมดอย่างต่อเนื่อง',
        'รีไฟแนนซ์บ้านเพื่อควบคุมค่างวดให้อยู่ในกรอบ 20,000 บาท'
      ]
    },
    {
      id: 'fin-edu', category: 'financial', target: 2044, progress: 45,
      title: 'เงินสะสมทุนการศึกษาลูกรองรับจนจบ ป.ตรี (ปี 2044)',
      keyResults: [
        'ลงทุนในกองทุนดัชนี/สินทรัพย์ความเสี่ยงต่ำเพื่อทุนเรียนลูก',
        'ทบทวนค่าใช้จ่ายการศึกษารายปี'
      ]
    },
    {
      id: 'fin-cashflow', category: 'financial', target: 2034, progress: 35,
      title: 'สร้าง Cash Flow หลังเกษียณ 35,000 - 40,000 บาท/เดือน',
      keyResults: [
        'สร้างพอร์ตเงินปันผล/อสังหาฯ/ธุรกิจส่วนตัว',
        'ประเมินแผนเกษียณร่วมกับประกันสุขภาพ'
      ]
    },
    {
      id: 'career-ai', category: 'career', target: 2027, progress: 40,
      title: 'เติบโตในงานประจำ & สร้างธุรกิจ AI/IoT บริหารอาคารก่อนเกษียณ 2 ปี',
      keyResults: [
        'ประยุกต์ AI & IoT เข้ากับงานวิศวกรรมอาคารประจำเพื่อแสดงผลงาน',
        'จัดทำ Business Service Module สำหรับรับงานบริหารอาคารแบบคนน้อย',
        'เปิดจดทะเบียนธุรกิจบริการวิศวกรรมยุคใหม่ก่อนอายุ 53 ปี'
      ]
    },
    {
      id: 'career-farm', category: 'career', target: 2028, progress: 30,
      title: 'พัฒนาบ้านสวนไร่นาผสม (โคก หนอง นา) ไฮเทค ควบคุมด้วย IoT',
      keyResults: [
        'วางระบบควบคุมการรดน้ำ-พลังงานแสงอาทิตย์ผ่าน Smart Phone',
        'สร้างพื้นที่พักผ่อนทางจิตใจ และผลิตอาหารปลอดภัยบริโภคในครอบครัว'
      ]
    },
    {
      id: 'health', category: 'health', target: 2025, progress: 70,
      title: 'ฟื้นฟูสุขภาพ: คุมน้ำหนัก ≤ 80kg & น้ำตาล ≤ 120 (ลดยาเบาหวาน)',
      keyResults: [
        'ทำ IF และปรับโภชนาการงดหวานงดแป้งขัดขาว',
        'ออกกำลังกายสะสมสัปดาห์ละไม่น้อยกว่า 150 นาที',
        'รักษาสุขภาพสมอง เรียนรู้สิ่งใหม่ ไม่เกิดภาวะซึมเศร้า'
      ]
    },
    {
      id: 'family', category: 'family', target: 2029, progress: 85,
      title: 'เป็นเสาหลักที่อบอุ่น แรงบันดาลใจของลูก และคู่ชีวิตที่แนบแน่น',
      keyResults: [
        'จัดสรร Quality Time ทำกิจกรรมร่วมกับภรรยาและลูกสัปดาห์ละ 1-2 ครั้ง',
        'ถ่ายทอดวิธีคิดการพัฒนาตัวเอง (Growth Mindset) ให้ลูกๆ เติบโตอย่างมั่นคง'
      ]
    }
  ],

  simulator: [
    {
      name: 'AI Building Energy', icon: 'building', status: 'ปกติ', statusTone: 'green',
      desc: 'ระบบ AI ปรับการใช้พลังงาน HVAC อัตโนมัติตามความหนาแน่นผู้ใช้อาคาร',
      metric: { label: 'Power Saved', value: 24.5, prefix: '+', unit: '%', decimals: 1, min: 22, max: 27, jitter: 0.4 }
    },
    {
      name: 'Smart Precision Farm', icon: 'sprout', status: 'ทำงานอัตโนมัติ', statusTone: 'amber',
      desc: 'วัดความชื้นดิน พยากรณ์อากาศ สั่งรดน้ำแบบน้ำหยดและโซลาร์เซลล์',
      metric: { label: 'Soil Moisture', value: 68, unit: '%', suffix: ' (Optimal)', decimals: 0, min: 62, max: 74, jitter: 1 }
    },
    {
      name: 'Predictive Maintenance', icon: 'shield', status: 'แจ้งเตือน 0 รายการ', statusTone: 'amber',
      desc: 'ตรวจจับแรงสั่นสะเทือนปั๊มน้ำ/ลิฟต์ ด้วย IoT Sensors ก่อนเกิดความเสียหาย',
      metric: { label: 'System Health', value: 99.2, unit: '%', decimals: 1, min: 98.6, max: 99.9, jitter: 0.15 }
    }
  ]
};

