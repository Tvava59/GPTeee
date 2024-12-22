// 確保執行後檔案載入完成
window.onload = () => {
    const navbar = document.querySelector(".navbar"); // 選擇導航欄

    // 滾動事件
    window.onscroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled"); // 超過 10px 加入 scrolled 樣式
        } else {
            navbar.classList.remove("scrolled"); // 回到頂部移除 scrolled 樣式
        }
    };
};