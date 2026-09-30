/**
 * Lotus Academy - Online Admission Form Handler
 * Prepares and sends formatted WhatsApp admissions inquiry to school office
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admissionInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentName = document.getElementById("studentName")?.value.trim();
    const parentName = document.getElementById("parentName")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const program = document.getElementById("program")?.value;
    const previousSchool = document.getElementById("previousSchool")?.value.trim();
    const gpa = document.getElementById("gpa")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!studentName || !phone || !program) {
      alert("Please fill in Student Name, Contact Number, and select a Program.");
      return;
    }

    // Format neat WhatsApp text
    const text = 
      `🎓 *NEW ADMISSION INQUIRY - LOTUS ACADEMY*\n` +
      `----------------------------------------\n` +
      `👤 *Student Name:* ${studentName}\n` +
      `👨‍👩‍👧 *Parent/Guardian:* ${parentName || 'N/A'}\n` +
      `📱 *Contact Phone:* ${phone}\n` +
      `📍 *Address:* ${address || 'Simara / Bara'}\n` +
      `📚 *Program Applied:* ${program}\n` +
      `🏫 *Previous School:* ${previousSchool || 'N/A'}\n` +
      `📊 *SEE / Last GPA:* ${gpa || 'N/A'}\n` +
      (message ? `💬 *Note:* ${message}\n` : '') +
      `----------------------------------------\n` +
      `Sent via Lotus Academy Official Website Portal`;

    const encoded = encodeURIComponent(text);
    // Official School WhatsApp Number (Nepal)
    const schoolWhatsApp = "9779801510839"; // Direct admissions line
    const waUrl = `https://wa.me/${schoolWhatsApp}?text=${encoded}`;

    window.open(waUrl, "_blank");

    // Show nice confirmation alert
    const statusMsg = document.getElementById("formStatusMsg");
    if (statusMsg) {
      statusMsg.style.display = "block";
      statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Inquiry compiled! Opening WhatsApp to send your application directly to Lotus Academy Admissions Office.`;
      form.reset();
    }
  });
});
