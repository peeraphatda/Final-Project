"""
Module: test_data_store.py
Role: Debugger (ภีม)
Description: Unit Testing ความถูกต้องของการบันทึก SQLite Database
"""
import pytest
import os
from src.data_store import DataStore

def test_sqlite_save_and_retrieve():
    test_db = "data/test_history.db"
    store = DataStore(db_path=test_db)
    
    store.save_analysis("I feel very excited!", "joy", 0.99, ["#FFD700", "#FF8C00"])
    history = store.get_history(limit=1)
    
    assert len(history) == 1
    assert history[0]["text"] == "I feel very excited!"
    assert history[0]["emotion"] == "joy"
    
    # Cleanup
    if os.path.exists(test_db):
        os.remove(test_db)