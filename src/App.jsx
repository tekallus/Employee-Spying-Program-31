import { useState } from 'react'
import Header from './components/Header'
import './styles.css'
export default function App() {
  const [userInput, setUserInput] = useState('')
  const [trackingReports, setTrackingReports] = useState([])

  const infractionMessage = '🚨🚨🚨 İHLAL TESPİT EDİLDİ! 🚨🚨🚨'

  // Kullanıcı textarea'ya her yazı yazdığında tetiklenecek fonksiyon
  const handleInputChange = (event) => {
    const inputText = event.target.value

    // "Evil Corp." stringini içerip içermediğini kontrol et
    const infractionDetected = inputText.includes('Evil Corp.')

    // "Evil Corp." stringini "Good Corp." ile değiştirerek yeni bir string oluştur ve bu değiştirilmiş metni userInput state'ine atar
    const replacedText = inputText.replace(/Evil Corp\./gi, 'Good Corp.')

    // Yeni rapor oluştur
    const newReport = {
      timeStamp: getTimeStamp(),
      employeeInput: replacedText, // inputText yerine replacedText kullanıldı
      infractionDetected: infractionDetected,
    }

    // trackingReports state'ine yeni raporu ekleyelim
    setTrackingReports((prevReports) => [...prevReports, newReport])

    // setUserInput(replacedText) // setUserInput'i buraya taşıdım, rapor eklendikten sonra güncelle
    setUserInput(replacedText) // userInput state'ini güncelle
  }

  // Zaman damgası oluşturma fonksiyonu
  function getTimeStamp() {
    const timeStamp = new Date()
    return (
      timeStamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }) +
      '.' +
      (timeStamp.getMilliseconds() / 1000).toFixed(3).slice(-3)
    )
  }

  // Her render'da son raporu kontrol et ve gerekirse ihlal mesajını yazdır
  if (
    trackingReports.length > 0 &&
    trackingReports[trackingReports.length - 1].infractionDetected
  ) {
    console.log(infractionMessage)
  }
  /* Challenge 

Bu şirket çalışanlarını gözetlemek istiyor. Göreviniz aşağıdakileri yapmalarına yardımcı olmak:

    1. Kullanıcı textarea'ya her yazı yazdığında, userInput ve trackingReports state'lerinin her ikisi de güncellenmelidir. 
       
            a. userInput'un değeri, kullanıcının textarea'ya yazdığı her şeye eşit bir string olmalıdır (aşağıdaki görev 2'de tartışılan bir istisna dışında). 
            
            b. trackingReports state array için, dizide önceden var olan tüm nesneler korunmalı ve dizinin sonuna yeni bir nesne eklenmelidir. 
                    
             Özellik   		 	          Değer 				  
		    	╷----------------------╷-------------------------------------------╷
		      |  timeStamp           |  getTimeStamp fonksiyonunun return değeri |
		    	|----------------------|-------------------------------------------|
		    	|  employeeInput       |  textarea'daki geçerli girdinin tümü |
		    	|----------------------|-------------------------------------------|
		    	|  infractionDetected  |   employeeInput "Evil Corp." stringini    |
          |                      |  içeriyorsa true - aksi takdirde, false   |	
		    	¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
           
       2. Eğer kullanıcı "Evil Corp." stringini yazarsa ("title case" olarak) yazarsa, bu dize hem userInput state'inde hem de textarea'da otomatik olarak "Good Corp." ile değiştirilmelidir. 
       
    3. Metin alanına "Evil Corp. test" yazarak uygulamayı test edin. Bu görevleri doğru bir şekilde tamamlarsanız, her harf yazdığınızda bir console.log mesajı almalısınız ve mesajlar sampleOutput.md dosyasındakiler gibi olmalıdır.

       
       4. Yalnızca aşağıdaki kodu yazmanız gerekir. Yukarıdaki veya projenin başka bir yerindeki kodların hiçbirinin değiştirilmesi gerekmiyor.
*/

  return (
    <div>
      <Header />
      {/* textarea'ya yazılanları dinlemek için onChange olayını dinleyin */}
      <textarea
        placeholder="Raporunuzu buraya yazın..."
        value={userInput}
        onChange={handleInputChange}
      />
    </div>
  )
}
