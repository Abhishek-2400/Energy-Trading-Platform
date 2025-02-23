import pandas as pd
import streamlit as st


# Load the data
data = pd.read_csv("SM Cleaned Data MH Aggregated.csv")
data['Date'] = pd.to_datetime(data['Date'])

# Filter for a specific meter, e.g., "MH01"
meter_data = data[data['meter'] == 'MH01']

# Daily Comparison
today = meter_data['Date'].max()
yesterday = today - pd.Timedelta(days=1)
today_kwh = meter_data[meter_data['Date'] == today]['t_kWh'].sum()
yesterday_kwh = meter_data[meter_data['Date'] == yesterday]['t_kWh'].sum()

# Display daily comparison using Streamlit metrics
st.title("Electricity Consumption Tracker")
st.subheader("Consumption Comparison")
st.metric("Today's Units (kWh)", f"{today_kwh:.2f}", delta=f"{(today_kwh - yesterday_kwh):.2f}")
st.metric("Yesterday's Units (kWh)", f"{yesterday_kwh:.2f}")

# Weekly Comparison
meter_data.set_index('Date', inplace=True)
weekly_data = meter_data['t_kWh'].resample('W').sum()

# Plot weekly data
st.subheader("Weekly Comparison (kWh)")
st.bar_chart(weekly_data)



# Monthly Comparison (Optional)
monthly_data = meter_data['t_kWh'].resample('M').sum()
st.subheader("Monthly Comparison (kWh)")
st.bar_chart(monthly_data)
