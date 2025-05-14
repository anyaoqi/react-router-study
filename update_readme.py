import base64
import json
import requests
import sys

# 读取README文件内容
with open('new_readme.md', 'r', encoding='utf-8') as file:
    content = file.read()

# Base64编码
encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')

# GitHub API信息
repo_owner = 'anyaoqi'
repo_name = 'web-bookmark'
file_path = 'README.md'
sha = 'cb68436d58ab4e9b764762d2740b5d44b5107192'

# 提示用户输入GitHub令牌
token = input("请输入您的GitHub令牌: ")

# 准备API请求
url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{file_path}'
headers = {
    'Authorization': f'token {token}',
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
}
data = {
    'message': '优化README文档，提升项目可读性和吸引力',
    'content': encoded_content,
    'sha': sha
}

# 发送请求
response = requests.put(url, headers=headers, data=json.dumps(data))

# 输出结果
if response.status_code == 200:
    print("README更新成功！")
else:
    print(f"更新失败。状态码：{response.status_code}")
    print(response.text) 