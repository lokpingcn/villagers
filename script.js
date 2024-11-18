// 加载村民数据
let villagers = [];
fetch('villagers.json')
    .then(response => response.json())
    .then(data => {
        villagers = data;
    });

// 查询功能
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim();
    const result = villagers.find(villager => villager.chs === searchInput || villager.cht === searchInput);

    const resultDiv = document.getElementById('result');
    if (result) {
        // 更新结果内容
        document.getElementById('eng-name').textContent = `英文名: ${result.eng}`;
        document.getElementById('code').textContent = `代码名称: ${result.id}`;
        document.getElementById('command').textContent = `%ordercat villager:${result.eng}`;

        // 重置复制按钮
        const copyButton = document.getElementById('copy-command');
        copyButton.textContent = '复制村民指令';
        copyButton.style.backgroundColor = '#007BFF';

        resultDiv.style.display = 'block';
    } else {
        alert('未找到匹配的村民！');
        resultDiv.style.display = 'none';
    }
});

// 复制功能
document.getElementById('copy-command').addEventListener('click', () => {
    const commandText = document.getElementById('command').textContent;

    // 创建临时输入框复制内容
    const tempInput = document.createElement('textarea');
    tempInput.value = commandText;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        // 执行复制
        document.execCommand('copy');
        // 更新按钮状态
        const copyButton = document.getElementById('copy-command');
        copyButton.textContent = '已复制指令';
        copyButton.style.backgroundColor = '#28a745'; // 绿色
        alert('村民指令已成功复制！');
    } catch (err) {
        alert('复制失败，请手动复制内容。');
    }
    document.body.removeChild(tempInput); // 清理临时输入框
});