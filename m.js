// 初始化假数据
const initialData = {
    allergies: "阿斯匹林, 消炎止痛藥",
    pastIllness: "氣喘",
    longTermMedication: "無",
    habits: "吸菸, 喝酒",
    pregnancyStatus: "無"
};

// 模拟数据库存储（使用 localStorage）
if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(initialData));
}

// 从 localStorage 加载数据
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    // 显示数据到页面
    document.getElementById("allergies").innerText = userData.allergies || "無";
    document.getElementById("past-illness").innerText = userData.pastIllness || "無";
    document.getElementById("long-term-medication").innerText = userData.longTermMedication || "無";
    document.getElementById("habits").innerText = userData.habits || "無";
    document.getElementById("pregnancy-status").innerText = userData.pregnancyStatus || "無";
}

// 显示修改表单
function showForm() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    document.getElementById("formModal").classList.remove("hidden");

    // 初始化表单内容
    setCheckboxValues("allergy", userData.allergies.split(", "));
    setCheckboxValues("illness", userData.pastIllness.split(", "));
    setRadioValue("medication", userData.longTermMedication === "無" ? "否" : "是");
    document.getElementById("medication-other").value = userData.longTermMedication === "無" ? "" : userData.longTermMedication;
    setCheckboxValues("habit", userData.habits.split(", "));
    setRadioValue("pregnancy", userData.pregnancyStatus);
}

// 保存数据
function saveData() {
    // 获取表单数据
    const updatedData = {
        allergies: getCheckboxValues("allergy").join(", "),
        pastIllness: getCheckboxValues("illness").join(", "),
        longTermMedication: getRadioValue("medication") === "否" ? "無" : document.getElementById("medication-other").value,
        habits: getCheckboxValues("habit").join(", "),
        pregnancyStatus: getRadioValue("pregnancy")
    };

    // 保存到 localStorage
    localStorage.setItem("userData", JSON.stringify(updatedData));

    // 更新页面数据
    loadUserData();

    // 关闭表单
    closeForm();

    alert("資料已儲存！");
}

// 关闭修改表单
function closeForm() {
    document.getElementById("formModal").classList.add("hidden");
}

// 获取选中的复选框值
function getCheckboxValues(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    const values = Array.from(checkboxes).map(checkbox => checkbox.value);
    const otherInput = document.getElementById(`${groupName}-other`);
    if (values.includes("其他") && otherInput && otherInput.value.trim()) {
        values.push(otherInput.value.trim());
    }
    return values;
}

// 设置复选框的选中状态
function setCheckboxValues(groupName, values) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = values.includes(checkbox.value);
    });
    const otherInput = document.getElementById(`${groupName}-other`);
    if (values.includes("其他") && otherInput) {
        otherInput.classList.remove("hidden");
        otherInput.value = values.find(value => value !== "無" && value !== "其他") || "";
    } else if (otherInput) {
        otherInput.classList.add("hidden");
        otherInput.value = "";
    }
}

// 获取单选按钮值
function getRadioValue(groupName) {
    const selected = document.querySelector(`input[name="${groupName}"]:checked`);
    return selected ? selected.value : "";
}

// 设置单选按钮的选中状态
function setRadioValue(groupName, value) {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    radios.forEach(radio => {
        radio.checked = radio.value === value;
    });
}

// 页面加载时初始化数据
loadUserData();
