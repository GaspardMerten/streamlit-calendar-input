# 📅 Streamlit Calendar Input Widget 

A **custom Streamlit calendar widget** that lets users **select dates** from a list of available options. Dates are shown **month-by-month**, with **green** marking available days and **red** marking unavailable ones.

## 🔧 Features

* 📆 Interactive calendar input widget for Streamlit
* ✅ Green: Available dates
* ❌ Red: Unavailable dates
* 🖱️ Click to select a date
* 🔄 Returns a Python `datetime.date` object

---

## ✨ Example Screenshots

![Dark mode Screenshot](https://github.com/GaspardMerten/streamlit-calendar-input/blob/main/docs/dark.png?raw=true)
![Light mode Screenshot](https://github.com/GaspardMerten/streamlit-calendar-input/blob/main/docs/light.png?raw=true)

---

## 📦 Installation

```bash
pip install streamlit-calendar-input
```

---

## 🚀 Usage

```python
import streamlit as st
from streamlit_calendar_input import calendar_input
import datetime

# Define available dates (e.g. from your backend, bookings, etc.)
available_dates = [
    datetime.date(2025, 6, 20),
    datetime.date(2025, 6, 25),
    datetime.date(2025, 7, 2),
]

# Call the calendar input
selected_date = calendar_input(available_dates)

# Display the selected date
if selected_date:
    st.success(f"You selected: {selected_date}")
```

---

## 🧠 How it Works

* The widget renders a calendar month by month.
* Each day is color-coded:

  * ✅ Green: Clickable, available in `available_dates`
  * ❌ Red: Not clickable, unavailable
* When a user clicks a green date, the widget returns the corresponding `datetime.date` object.

---

## 📌 Requirements

* Python 3.7+
* [Streamlit](https://streamlit.io/) 1.0+

---

## 🧪 Development

```bash
# Clone the repo
git clone https://github.com/yourusername/streamlit-calendar-input.git
cd streamlit-calendar-input

# (Optional) Create a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -e .
```

---

## 📝 License

MIT License. See [LICENSE](./LICENSE) for more details.
