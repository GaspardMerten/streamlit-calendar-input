from datetime import datetime

import streamlit as st
from streamlit_calendar_input import calendar_input

selected_date = calendar_input([
    datetime(2001, 11, 20, 12, 0),
    datetime(2025, 9, 1, 12, 0),
    datetime(2025, 10, 1, 12, 0)
])

st.write(f"Selected date: {selected_date}")
