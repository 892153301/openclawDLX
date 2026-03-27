"""
即梦AI (火山引擎) 视频生成API封装
使用官方Volcengine SDK
"""

import os
import sys

# 添加lib目录到路径
lib_dir = os.path.dirname(os.path.abspath(__file__))
if lib_dir not in sys.path:
    sys.path.insert(0, lib_dir)

from volcengine.visual.VisualService import VisualService

# 配置 - 从环境变量读取
ACCESS_KEY = os.environ.get('JIMENG_ACCESS_KEY', '')
SECRET_KEY = os.environ.get('JIMENG_SECRET_KEY', '')

# 初始化服务
_visual_service = None

def get_visual_service():
    global _visual_service
    if _visual_service is None:
        _visual_service = VisualService()
        _visual_service.set_ak(ACCESS_KEY)
        _visual_service.set_sk(SECRET_KEY)
    return _visual_service


def submit_video_task(image_url: str = '', prompt: str = '', frames: int = 121, 
                     aspect_ratio: str = '16:9', seed: int = -1) -> dict:
    """
    提交即梦视频3.0 Pro任务
    
    Args:
        image_url: 首帧图片URL (图生视频)
        prompt: 视频生成提示词 (文生视频/图生视频)
        frames: 帧数 (121=5秒, 241=10秒)
        aspect_ratio: 视频比例
        seed: 随机种子
    
    Returns:
        {"success": True, "task_id": "xxx"} 或 {"success": False, "error": "xxx"}
    """
    service = get_visual_service()
    
    # 准备请求参数
    params = {
        'req_key': 'jimeng_ti2v_v30_pro',
        'prompt': prompt,
        'frames': frames,
        'aspect_ratio': aspect_ratio,
        'seed': seed
    }
    
    # 如果有图片URL，添加图片参数
    if image_url:
        params['image_urls'] = [image_url]
    
    try:
        # 使用 cv_sync2async_submit_task
        resp = service.cv_sync2async_submit_task(params)
        
        # 检查响应
        if resp.get('code') == 10000:
            return {
                'success': True, 
                'task_id': resp.get('data', {}).get('task_id')
            }
        else:
            return {
                'success': False, 
                'error': resp.get('message', 'Unknown error')
            }
    except Exception as e:
        return {
            'success': False, 
            'error': str(e)
        }


def query_video_task(task_id: str) -> dict:
    """
    查询视频生成任务状态
    
    Args:
        task_id: 任务ID
    
    Returns:
        {"status": "pending/processing/done/failed", "video_url": "xxx", "error": "xxx"}
    """
    service = get_visual_service()
    
    params = {
        'req_key': 'jimeng_ti2v_v30_pro',
        'task_id': task_id
    }
    
    try:
        resp = service.cv_get_result(params)
        
        if resp.get('code') == 10000:
            data = resp.get('data', {})
            status = data.get('status', 'unknown')
            
            if status == 'done':
                return {
                    'status': 'done',
                    'video_url': data.get('video_url')
                }
            elif status == 'generating':
                return {'status': 'processing'}
            elif status == 'in_queue':
                return {'status': 'pending'}
            else:
                return {
                    'status': 'failed',
                    'error': data.get('message', 'Unknown error')
                }
        else:
            return {
                'status': 'failed',
                'error': resp.get('message', 'Query failed')
            }
    except Exception as e:
        return {
            'status': 'failed',
            'error': str(e)
        }


if __name__ == '__main__':
    # 测试提交任务
    print('Testing submit task...')
    result = submit_video_task(
        image_url='https://picsum.photos/800/450',
        prompt='测试视频：雨夜小巷，灯光昏暗',
        frames=121,
        aspect_ratio='16:9'
    )
    print('Result:', result)
    
    if result.get('success'):
        task_id = result.get('task_id')
        print(f'Task ID: {task_id}')
        
        # 查询任务状态
        print('Querying task status...')
        for i in range(60):
            import time
            time.sleep(3)
            status_result = query_video_task(task_id)
            print(f'Status: {status_result}')
            
            if status_result.get('status') in ['done', 'failed']:
                break
