#!/usr/bin/env python3
"""
即梦AI图像生成 Wrapper (静默模式)
"""
import os
import sys
import json

# Suppress console output
class SuppressPrint:
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = open(os.devnull, 'w')
        return self
    def __exit__(self, *args):
        sys.stdout.close()
        sys.stdout = self._stdout

WORKSPACE_PATH = os.path.expanduser("~/.openclaw/workspace")
if WORKSPACE_PATH not in sys.path:
    sys.path.insert(0, WORKSPACE_PATH)

from jimeng_api import submit_task as _submit, query_task as _query

def submit_task(prompt: str, width: int = 1024, height: int = 1024) -> dict:
    with SuppressPrint():
        try:
            result = _submit(prompt, width, height)
            return {'code': result.get('code', 0), 'data': result.get('data', {}), 'task_id': result.get('data', {}).get('task_id')}
        except Exception as e:
            return {'code': -1, 'error': str(e)}

def query_task(task_id: str) -> dict:
    with SuppressPrint():
        try:
            result = _query(task_id)
            return {'code': result.get('code', 0), 'data': result.get('data', {}), 'task_status': result.get('data', {}).get('task_status')}
        except Exception as e:
            return {'code': -1, 'error': str(e)}

if __name__ == '__main__':
    if len(sys.argv) > 1:
        result = submit_task(sys.argv[1])
        print(json.dumps(result, ensure_ascii=False))