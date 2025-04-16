import streamlit as st
import pandas as pd
import requests
import altair as alt

st.sidebar.title("Menu")
Opsi = st.sidebar.radio("Pilih Halaman", ["Beranda", "Statistik Penggunaan Alat", "Ekspresi Wajah Pengguna", "Tanya AI"])

if Opsi == "Beranda":
    st.title("🕷️ Selamat Datang di Web Spider Sense")
    st.subheader("🤖 Asisten AI untuk Tunanetra")
    st.markdown("---")
    st.subheader("📸 Gambar Alat")
    col1, col2 = st.columns(2)
    with col1:
        st.image("gambar/alat1.jpeg", caption="Gambar 1", use_column_width=True, width=300)
        st.image("gambar/alat2.jpeg", caption="Gambar 5", use_column_width=True, width=300)
    with col2:
        st.image("gambar/alat3.jpeg", caption="Gambar 7", use_column_width=True, width=300)
        st.image("gambar/alat4.jpeg", caption="Gambar 3", use_column_width=True, width=300)
    st.markdown("-----")
    st.header("Dilengkapi dengan kamera yang dapat:")
    st.markdown("- Mendeteksi emosi wajah 👁️")
    col1, col2 = st.columns(2)
    with col1:
        st.image("imgWajah.jpg", use_column_width=True)
    with col2:
        st.image("imgWajah2.jpg", use_column_width=True)
    st.markdown("-----")
    st.markdown("- Mendeteksi objek 🎯")
    col1, col2 = st.columns(2)
    with col1:
        st.image("imgObjek.jpg", use_column_width=True)
    with col2:
        st.empty()
    st.markdown("-----")
    st.markdown("- Membaca teks lalu mengubahnya menjadi suara 🗣️")
    col1, col2 = st.columns(2)
    with col1:
        st.image("imgteks.jpg", use_column_width=True)
    with col2:
        st.empty()
    st.markdown("-----")
    st.header("Web Interaktif Untuk Memantau Alat dan Pengguna")
    col1, col2 = st.columns(2)
    st.image("gambar/ubidot.png ", use_column_width=True)
    st.markdown("-----")
    st.header("Alat Memiliki Hasil yang Dapat Didengar Melalui Speaker")
    col1, col2 = st.columns(2)
    with col1:
        st.image("gambar/speaker.jpeg", use_column_width=True)
    with col2:
        st.empty()
    st.markdown("---")
    st.subheader("📬 Kontak Developer")
    st.write("dibuat oleh MERA XI")
    st.write("EMAIL: merasmkn2@gmail.com")
    st.write("WhatsApp: 085877158827")
    st.markdown("---")
    st.write("© 2025 MERA XI Dev. All rights reserved.")
    st.markdown("<center><small>--Spider Sense - Asisten AI untuk Tunanetra--</small></center>", unsafe_allow_html=True)

elif Opsi == "Statistik Penggunaan Alat":
    st.title("📊 Statistik Penggunaan Alat")
    try:
        response = requests.get("http://localhost:2000/get_data_penggunaan")
        if response.status_code == 200:
            data_penggunaan = response.json()
            df_penggunaan = pd.DataFrame(data_penggunaan)
            df_penggunaan['timestamp'] = pd.to_datetime(df_penggunaan['timestamp'])
            df_penggunaan['tanggal'] = df_penggunaan['timestamp'].dt.date
            df_penggunaan['hari'] = df_penggunaan['timestamp'].dt.day_name()
            st.subheader("Statistik Harian")
            penggunaan_harian = df_penggunaan.groupby(['tanggal', 'komponen']).size().unstack(fill_value=0)
            st.bar_chart(penggunaan_harian)
            st.subheader("Statistik Mingguan")
            penggunaan_mingguan = df_penggunaan.groupby('hari').size().reindex(
                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                fill_value=0
            )
            penggunaan_mingguan.index = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
            st.line_chart(penggunaan_mingguan)
            st.subheader("Tabel Data Penggunaan")
            st.dataframe(df_penggunaan)
            csv_download = df_penggunaan.to_csv(index=False).encode('utf-8')
            st.download_button(
                label="📥 Download Data Penggunaan (CSV)",
                data=csv_download,
                file_name="data_penggunaan.csv",
                mime='text/csv'
            )
        else:
            st.error("Gagal mengambil data penggunaan dari Flask.")
    except Exception as e:
        st.error(f"Terjadi error saat mengambil data: {e}")

elif Opsi == "Ekspresi Wajah Pengguna":
    st.title("😊 Statistik Ekspresi Wajah Pengguna")
    try:
        response = requests.get("http://localhost:2000/get_data_emosi")
        if response.status_code == 200:
            data_emosi = response.json()
            df_emosi = pd.DataFrame(data_emosi)
            st.subheader("Distribusi Ekspresi Wajah")
            chart = alt.Chart(df_emosi).mark_bar().encode(
                x='Ekspresi',
                y='Jumlah',
                tooltip=['Ekspresi', 'Jumlah']
            ).interactive()
            st.altair_chart(chart, use_container_width=True)
            st.subheader("Tabel Data Ekspresi")
            st.dataframe(df_emosi)
            csv_download = df_emosi.to_csv(index=False).encode('utf-8')
            st.download_button(
                label="📥 Download Data Ekspresi (CSV)",
                data=csv_download,
                file_name="data_emosi.csv",
                mime='text/csv'
            )
        else:
            st.error("Gagal mengambil data emosi dari Flask.")
    except Exception as e:
        st.error(f"Terjadi error saat mengambil data: {e}")

elif Opsi == "Tanya AI":
    import torch
    import google.generativeai as genai
    import pyttsx3
    import threading
    from gtts import gTTS
    import base64
    
    st.title("🧠 Chatbot AI")
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    voices = engine.getProperty('voices')
    for voice in voices:
        if "indonesian" in voice.name.lower() or "id" in str(voice.languages).lower():
            engine.setProperty('voice', voice.id)
            break

    def speak(text):
        def run():
            engine.say(text)
            engine.runAndWait()
        threading.Thread(target=run).start()

    @st.cache_resource
    def load_model():
        return torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

    model_yolo = load_model()

    KNOWN_WIDTH = 40.0
    FOCAL_LENGTH = 600

    genai.configure(api_key="AIzaSyBPddmxJ5KDxoqhm0FfhUUU9IWtek0dyFs")

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction="Kamu "
    )

    def tanya_model():
        if "chat_response" not in st.session_state:
            st.session_state.chat_response = ""
        if "tokens_used" not in st.session_state:
            st.session_state.tokens_used = 0

        with st.form("chat_form"):
            user_question = st.text_input("Tanyakan sesuatu pada sang AI AI:")
            submitted = st.form_submit_button("Tanyakan")

            if submitted and user_question:
                response = model.generate_content(
                    user_question,
                    generation_config=genai.types.GenerationConfig(
                        max_output_tokens=150,
                        temperature=1.0,
                        top_k=5,
                        top_p=1.0,
                    )
                )

                st.session_state.chat_response = response.text
                st.session_state.tokens_used = model.count_tokens(response.text).total_tokens

                st.markdown("**💬 Jawaban dari AI:**")
                st.write(st.session_state.chat_response)
                st.caption(f"🔢 Jumlah token output: {st.session_state.tokens_used}")

                tts = gTTS(text=response.text, lang='id')
                tts.save("response.mp3")

                audio_file = open("response.mp3", "rb")
                audio_bytes = audio_file.read()
                b64 = base64.b64encode(audio_bytes).decode()
                audio_html = f"""
                    <audio autoplay>
                    <source src="data:audio/mp3;base64,{b64}" type="audio/mp3">
                    </audio>
                """

                st.markdown(audio_html, unsafe_allow_html=True)

    tanya_model()