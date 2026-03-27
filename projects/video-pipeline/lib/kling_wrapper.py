#!/usr/bin/env python3
"""
可灵AI图生视频 Wrapper
基于可灵AI官方API
"""
import os
import json
import time
import hashlib
import hmac
import requests
from datetime import datetime

# 从环境变量读取（安全方式）
ACCESS_KEY = os.environ.get('KLING_ACCESS_KEY', '')
SECRET_KEY = os.environ.get('KLING_SECRET_KEY', '')

def get_signature(access_key, secret_key, method, url, timestamp, body=''):
    """生成API签名"""
    sign_str = f"{method}\n{url}\n{timestamp}\n{body}"
    signature = hmac.new(
        secret_key.encode(),
        sign_str.encode(),
        hashlib.sha256
    ).hexdigest()
    return f"{access_key}:{signature}"

def submit_video_task(image_url: str, prompt: str, duration: int = 5, 
                      access_key: str = '', secret_key: str = '') -> dict:
    """提交可灵视频生成任务"""
    ak = access_key or ACCESS_KEY
    sk = secret_key or SECRET_KEY
    
    if not ak or not sk:
        return {'code': -1, 'error': 'Missing API credentials'}
    
    timestamp = str(int(time.time()))
    url_path = '/api/v1/videos/image2video'
    body = {
        'model': 'kling-v1',
        'image_url': image_url,
        'prompt': prompt,
        'duration': duration,  # 5 or 10
        'aspect_ratio': '16:9',
        'callback_url': ''
    }
    body_str = json.dumps(body)
    
    headers = {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
        'X-Authorization': get_signature(ak, sk, 'POST', url_path, timestamp, body_str)
    }
    
    try:
        resp = requests.post(
            f'https://api.klingai.com{url_path}',
            headers=headers,
            json=body,
            timeout=30
        )
        data = resp.json()
        return {'code': 0, 'task_id': data.get('data', {}).get('task_id')}
    except Exception as e:
        return {'code': -1, 'error': str(e)}

def query_video_task(task_id: str, access_key: str = None, secret_key: str = None) -> dict:
    """查询可灵视频任务状态"""
    ak = access_key or ACCESS_KEY
    sk = secret_key or SECRET_KEY
    
    if not ak or not sk:
        return {'code': -1, 'error': 'Missing API credentials'}
    
    timestamp = str(int(time.time()))
    url_path = f'/api/v1/videos/image2video/{task_id}'
    
    headers = {
        'X-Timestamp': timestamp,
        'X-Authorization': get_signature(ak, sk, 'GET', url_path, timestamp)
    }
    
    try:
        resp = requests.get(
            f'https://api.klingai.com{url_path}',
            headers=headers,
            timeout=30
        )
        data = resp.json()
        task_data = data.get('data', {})
        
        status_map = {
            'PENDING': 'processing',
            'PROCESSING': 'processing', 
            'COMPLETED': 'completed',
            'FAILED': 'failed'
        }
        
        return {
            'code': 0,
            'status': status_map.get(task_data.get('status'), 'processing'),
            'video_url': task_data.get('video_url'),
            'cover_url': task_data.get('cover_url')
        }
    except Exception as e:
        return {'code': -1, 'error': str(e)}

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        result = submit_video_task(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else '')
        print(json.dumps(result, ensure_ascii=False))
