class Student {
  constructor(name, age, email, gender, grade, contact, dob, address) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.gender = gender;
    this.grade = grade;
    this.contact = contact;
    this.dob = dob;
    this.address = address;
    this.rollnumber = null;
    this.marks = {};
  }
}

class Teacher {
  constructor(name) {
    this.name = name;
  }
}

class School {
  constructor(name, address) {
    this.name = name;
    this.address = address;
    this.students = {};
    this.teacher = {};
  }

  addstudent(student, grade) {
    if (!this.students[grade]) {
      this.students[grade] = [];
    }
    student.rollnumber = this.students[grade].length + 1;
    return this.students[grade].push(student);
  }

  getstudent(grade, rollnumber) {
    return this.students[grade]?.find((ele) => ele.rollnumber == rollnumber);
  }

  assignteacher(teacher, grade) {
    if (!this.teacher[grade]) {
      this.teacher[grade] = [];
    }
    this.teacher[grade].push(teacher);
  }

  getteacher(grade) {
    return this.teacher[grade];
  }

  vewallstudent(grade) {
    return this.students[grade];
  }

  viewSummery(grade) {
    return {
      students: this.students[grade]?.map((ele) => ele.name) || [],
      teacher: this.teacher[grade]?.map((ele) => ele.name) || [],
    };
  }

  deletestudent(grade, rollnumber) {
    const index1 = this.students[grade]?.findIndex(
      (ele) => ele.rollnumber === rollnumber
    );
    if (index1 !== -1) {
      this.students[grade].splice(index1, 1);
    }
  }

  addmarks(student, subject, mark) {
    return (student.marks[subject] = mark);
  }

  updatestudent(oldGrade, rollnumber, data) {
    const studentindex = this.students[oldGrade]?.findIndex(
      (ele) => ele.rollnumber === rollnumber
    );
    if (studentindex === -1 && !this.students[oldGrade]) {
      alert("student not found in this grade");
      return null;
    }
    const student = this.students[oldGrade][studentindex];
    let newRollnumber = student.rollnumber;

    if (data.name) {
      student.name = data.name;
    }
    if (data.age) {
      student.age = data.age;
    }
    if (data.email) {
      student.email = data.email;
    }
    if (data.gender) {
      student.gender = data.gender;
    }

    if (data.grade && data.grade !== oldGrade) {
      this.students[oldGrade].splice(studentindex, 1);
      for (let i = 0; i < this.students[oldGrade].length; i++) {
        this.students[oldGrade][i].rollnumber = i + 1;
      }
      if (!this.students[data.grade]) {
        this.students[data.grade] = [];
      }
      student.grade = data.grade;
      student.rollnumber = this.students[data.grade].length + 1;
      newRollnumber = student.rollnumber;
      this.students[data.grade].push(student);
    }

    if (data.contact) {
      student.contact = data.contact;
    }
    if (data.dob) {
      student.dob = data.dob;
    }
    if (data.address) {
      student.address = data.address;
    }
    return {
      student: student,
      newRollnumber: newRollnumber,
    };
  }
}

// DOM START
const school = new School("Shri Krishan Kripa School", "Delhi Jankapuri West");

document
  .getElementById("addstudent-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const grade = parseInt(document.getElementById("grade").value);
    const contact = document.getElementById("contact").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;

    if (isNaN(grade)) {
      alert("enter grade ");
      return;
    }
    const student = new Student(
      name,
      age,
      email,
      gender,
      grade,
      contact,
      dob,
      address
    );
    const updates = school.addstudent(student, grade);
    localStorage.setItem("student", JSON.stringify(student));
    const sss = JSON.parse(localStorage.getItem("student")) || [];

    if (updates) {
      alert(`Student ${name} addedd successfully`);
    } else {
      alert("please enter the deatisl first");
    }
  });

document
  .getElementById("serach-student")
  .addEventListener("click", function () {
    const grade = parseInt(document.getElementById("stn-grade-1").value);
    const rollnumber = parseInt(document.getElementById("stn-roll").value);
    const showdata = document.getElementById("show-all-data");
    const student = school.getstudent(grade, rollnumber);

    if (student) {
      showdata.textContent = JSON.stringify(student, null, 2);
    } else {
      alert("student not found");
    }
  });

document.getElementById("clear-screen").addEventListener("click", function () {
  const showdata = document.getElementById("show-all-data");
  showdata.textContent = "";
});

// DATA MODEL 2 HANDEL UPDATE STUDENT
const updateBtn = document.getElementById("update-btn");
const datamodel2 = document.getElementById("data-model-update-2");
const cancelModel2_Btn = document.getElementById("cancel-update");
const searchModel2_Btn = document.getElementById("serach-update");

updateBtn.addEventListener("click", function () {
  datamodel2.style.display = "block";
});

cancelModel2_Btn.addEventListener("click", function () {
  datamodel2.style.display = "none";
});

searchModel2_Btn.addEventListener("click", function () {
  const grade = parseInt(document.getElementById("stn-grade-fetch").value);
  const rollnumber = parseInt(document.getElementById("stn-roll-fecth").value);
  if (isNaN(grade) || isNaN(rollnumber)) {
    alert("please enter garde and rollnumber");
    return;
  }

  const student = school.getstudent(grade, rollnumber);

  if (!student) {
    alert("student not found");
    return;
  }

  // PREFILLED DATA
  document.getElementById("new-name").value = student.name;
  document.getElementById("new-age").value = student.age;
  document.getElementById("new-email").value = student.email;
  document.getElementById("old-grade").value = student.grade;
  document.getElementById("new-gender").value = student.gender;
  document.getElementById("New-grade").value = "";
  document.getElementById("old-roll").value = student.rollnumber;
  document.getElementById("new-contact").value = student.contact;
  document.getElementById("new-dob").value = student.dob;
  document.getElementById("new-address").value = student.address;

  datamodel2.style.display = "none";
  dataModel.style.display = "block";
});

// DATA MODEL1 BIG HANDEL UPDATE STUDENT

const dataModel = document.getElementById("data-modal");
const cancelBtn = document.getElementById("cancel-btn");
const submitUpdate = document.getElementById("update-submit");

cancelBtn.addEventListener("click", function () {
  dataModel.style.display = "none";
});

submitUpdate.addEventListener("click", function (e) {
  e.preventDefault();
  const oldGrade = parseInt(document.getElementById("old-grade").value);
  const rollNumber = parseInt(document.getElementById("old-roll").value);
  if (isNaN(oldGrade) || isNaN(rollNumber)) {
    alert("please enter old garde and rollnumber");
    return;
  }
  const accessGradeNew = document.getElementById("New-grade").value;
  const newGrade =
    accessGradeNew.trim() !== "" ? parseInt(accessGradeNew) : undefined;

  if (accessGradeNew.trim() !== "" && isNaN(newGrade)) {
    alert("please enter valid number");
    return;
  }

  const updateStudent = {
    name: document.getElementById("new-name").value,
    age: document.getElementById("new-age").value,
    email: document.getElementById("new-email").value,
    gender: document.getElementById("new-gender").value,
    grade: newGrade,
    contact: document.getElementById("new-contact").value,
    dob: document.getElementById("new-dob").value,
    address: document.getElementById("new-address").value,
  };

  for (const key in updateStudent) {
    if (updateStudent[key] === "" || updateStudent[key] === undefined) {
      delete updateStudent[key];
    }
  }

  const updateNow = school.updatestudent(oldGrade, rollNumber, updateStudent);

  if (updateNow) {
    alert(`Student updated successfully!`);
    if (updateNow.student.grade !== oldGrade) {
      alert(
        `Student's grade changed. New Grade: ${updateNow.student.grade}, New Roll Number: ${updateNow.newRollNumber}`
      );
    }
    dataModel.style.display = "none";

    // Clear modal fields after successful update
    document.getElementById("new-name").value = "";
    document.getElementById("new-age").value = "";
    document.getElementById("new-email").value = "";
    document.getElementById("new-gender").value = "";
    document.getElementById("old-grade").value = "";
    document.getElementById("New-grade").value = "";
    document.getElementById("old-roll").value = "";
    document.getElementById("new-contact").value = "";
    document.getElementById("new-dob").value = "";
    document.getElementById("new-address").value = "";
  } else {
    alert(
      "Failed to update student. Please check the old Grade and Roll Number."
    );
  }
});

// DELET MODAL START
const deletBtn = document.getElementById("delet-btn");
const deletModal = document.getElementById("Delete-model");
const canceldltModal = document.getElementById("cancel-dlt-modal");
const srchDltModal = document.getElementById("serach-dlt-modal");
const showdata = document.getElementById("show-all-data");

deletBtn.addEventListener("click", function () {
  deletModal.style.display = "block";
});
canceldltModal.addEventListener("click", function () {
  deletModal.style.display = "none";
});

srchDltModal.addEventListener("click", function () {
  console.log("Clicked delete search button");
  const grade = parseInt(
    document.getElementById("dlt-modal-grade").value.trim()
  );
  const rollnumber = parseInt(
    document.getElementById("dlt-modal-roll").value.trim()
  );
  if (isNaN(grade) || isNaN(rollnumber)) {
    alert("please fill the required field");
    return;
  }

  const delteStudent = school.deletestudent(grade, rollnumber);

  deletModal.style.display = "none";

  showdata.textContent = "";
});
// VIEW ALL MODAL
const viewAllStudentBtn = document.getElementById("viewallstn-btn");
const ViewAllModal = document.getElementById("viewall-model");
const cancelViewAllBtn = document.getElementById("cancel-Viewall-modal");
const dearchViewAllBtn = document.getElementById("serach-Viewall-modal");

viewAllStudentBtn.addEventListener("click", function () {
  ViewAllModal.style.display = "block";
});

cancelViewAllBtn.addEventListener("click", function () {
  ViewAllModal.style.display = "none";
});

dearchViewAllBtn.addEventListener("click", function () {
  const grade = parseInt(
    document.getElementById("view-All-grade").value.trim()
  );

  if (isNaN(grade)) {
    alert("please enter grade");
    return;
  }

  const viewallStudent = school.vewallstudent(grade);
  ViewAllModal.style.display = "none";

  const showdata = document.getElementById("show-all-data");
  showdata.innerHTML = "";

  if (!viewallStudent || viewallStudent.length === 0) {
    showdata.textContent = "no student found in this grade";
    return;
  }

  viewallStudent.forEach((student) => {
    let div = document.createElement("div");
    div.textContent = `
                            Name : ${student.name || "N/A"}, 
                            Age : ${student.age || "N/A"},
                            Email : ${student.email || "N/A"},
                            Gender : ${student.gender || "N/A"},
                            Grade : ${student.grade || "N/A"},
                            Contact : ${student.contact || "N/A"},
                            D.O.B : ${student.dob || "N/A"},
                            Address : ${student.address || "N/A"},
                            Rollnumber : ${student.rollnumber || "N/A"}`;

    showdata.appendChild(div);
  });
});

// ADDMARKS MODEL SMALL START
const BTNaddmarkMain = document.getElementById("addmarks-btn");
const MarkModelSmall = document.getElementById("addmarks-model");
const cancelMarkBtn = document.getElementById("cancel-mark-modal");
const srchMarkBtn = document.getElementById("serach-mark-modal");
const MarksMainModel = document.getElementById("addmark-main-model");
const appendsubjectInp = document.getElementById("appendsubjectInp");
const crosBtn = document.getElementById("cancelmarkbtn");
const addmarkBtn = document.getElementById("addmarksbtn");
const fetchmarksbtn = document.getElementById("fetchmarksbtn");
let currentStudent = null;

BTNaddmarkMain.addEventListener("click", function () {
  MarkModelSmall.style.display = "block";
});
cancelMarkBtn.addEventListener("click", function () {
  MarkModelSmall.style.display = "none";
});

srchMarkBtn.addEventListener("click", function () {
  const grade = parseInt(
    document.getElementById("marks-modal-grade").value.trim()
  );
  const roll = parseInt(
    document.getElementById("marks-modal-roll").value.trim()
  );

  if (isNaN(grade) || isNaN(roll)) {
    alert("please enter is mendatory");
    return;
  }

  currentStudent = school.getstudent(grade, roll);
  if (!currentStudent) {
    alert("no student found");
    return;
  }
  MarkModelSmall.style.display = "none";
  MarksMainModel.style.display = "block";
});

//  ADDMARKS MAIN MODEL
crosBtn.addEventListener("click", function () {
  MarksMainModel.style.display = "none";
});

addmarkBtn.addEventListener("click", function () {
  const appendsubjectInp = document.getElementById("appendsubjectInp");
  const div = document.createElement("div");
  div.innerHTML = ` <input type="text" class="subject" placeholder="Subject">
                <input type="number" class="mark" placeholder="Marks">
                  <button class="inputdltbtn"><i class="fa fa-close" style="color:red"></i></button>`;

  appendsubjectInp.appendChild(div);
  div.querySelector(".inputdltbtn").addEventListener("click", function () {
    div.remove();
  });
});

fetchmarksbtn.addEventListener("click", function () {
  const subjectinp = document.querySelectorAll(".subject");
  const markinp = document.querySelectorAll(".mark");
  let marksadded = false;
  for (let i = 0; i < subjectinp.length; i++) {
    const subject = subjectinp[i].value.trim();
    const mark = parseInt(markinp[i].value.trim());

    if (subject === "" || isNaN(mark)) {
      alert("please enter subject and marks");
      return;
    }
    school.addmarks(currentStudent, subject, mark);
    marksadded = true;
  }
  if (marksadded) {
    const showdata = document.getElementById("show-all-data");
    showdata.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = `<p><strong>Name:</strong> ${currentStudent.name}</p>
             <p><strong>Age:</strong> ${currentStudent.age}</p>
             <p><strong>Email:</strong> ${currentStudent.email}</p>
             <p><strong>Gender:</strong> ${currentStudent.gender}</p>
             <p><strong>Grade:</strong> ${currentStudent.grade}</p>
             <p><strong>Contact:</strong> ${currentStudent.contact}</p>
             <p><strong>DOB:</strong> ${currentStudent.dob}</p>
             <p><strong>Address:</strong> ${currentStudent.address}</p>
             <p><strong>Marks:</strong>
               ${Object.entries(currentStudent.marks)
                 .map(([sub, mark]) => `${sub}: ${mark}`)
                 .join("<br>")}</p>`;
    showdata.appendChild(div);
    MarksMainModel.style.display = "none";
  }
});

const AssignTeacBtnUI = document.getElementById("assignteacher-btn");
const teacherModel = document.getElementById("addteacher-model");
const cancelTechBtn = document.getElementById("cancelTechbtn");
const addteacherBtn = document.getElementById("addTeacherBtn");
const viewTeacherBtn = document.getElementById("viewteacher-btn");

AssignTeacBtnUI.addEventListener("click", function () {
  teacherModel.style.display = "block";
});

cancelTechBtn.addEventListener("click", function () {
  teacherModel.style.display = "none";
});

addteacherBtn.addEventListener("click", function () {
  const teachName = document.getElementById("teacName").value.trim();
  const grade = parseInt(document.getElementById("teacGrade").value.trim());
  if (isNaN(grade)) {
    alert("please enter grade");
    return;
  }
  teacherobject = new Teacher(teachName);
  school.assignteacher(teacherobject, grade);
  teacherModel.style.display = "none";
});

viewTeacherBtn.addEventListener("click", function () {
  const grade = parseInt(document.getElementById("teacher-grade").value.trim());
  if (isNaN(grade)) {
    alert("please enter grade");
    return;
  }
  const teacher = school.getteacher(grade);

  const showdata = document.getElementById("show-all-data");
  showdata.innerHTML = "";

  if (!teacher || teacher.length === 0) {
    showdata.innerHTML = `<div><p><strong>No teacher assigned to Grade ${grade}</strong></p></div>`;
    return;
  }

  const teacherList = teacher
    .map((teach, i) => {
      return `<p>Teacher ${i + 1} : ${teach.name}</p>`;
    })
    .join("");

  showdata.innerHTML = `<div><p><strong>Grade: ${grade}</p>${teacherList}</div>`;
});
