import { useState } from 'react';
import './Form.css';

function Form() {
   const [form, setForm] = useState({
      pregnancies: "",
      glucose: "",
      blood_presure: "",
      skin_thickness: "",
      insulin_level: "",
      bmi: "",
      diabetes_pedigree: "",
      age: ""
   });

   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState("");

   const handleSubmit = (event) => {
        event.preventDefault();

        const form_data = new FormData();
        form_data.append("1", form.pregnancies);
        form_data.append("2", form.glucose);
        form_data.append("3", form.blood_presure)
        form_data.append("4", form.skin_thickness)
        form_data.append("5", form.insulin_level)
        form_data.append("6", form.bmi)
        form_data.append("7", form.diabetes_pedigree)
        form_data.append("8", form.age)

        setLoading(true);

      fetch("https://dsmodeldeployment2.azurewebsites.net/predict", {
        method: 'POST',
        body: form_data
      })
      .then(response => response.text())
      .then(html => {
        setResult(html);
        setLoading(false);
   })

   };

   const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
   };

   const handleClear = () => {
    setForm({
       pregnancies: "",
       glucose: "",
       blood_presure: "",
       skin_thickness: "",
       insulin_level: "",
       bmi: "",
       diabetes_pedigree: "",
       age: ""
    });

    setResult("");
 };

   return (
    <form onSubmit={handleSubmit}>
        <h4>Diabetes Prediction Model</h4>
        <p>Example to Predict Probability of Diabetes</p>
        <table>
            <tr>
                <td><label for="pregnancies">Number of Pregnancies:</label></td>
                <td><input type="number" name="pregnancies" value={form.pregnancies} onChange={onChange} placeholder="Number of Pregnancies" required/></td>
            </tr>
            <tr>
                <td><label for="glucose">Glucose level in Sugar:</label></td>
                <td><input type="number" name="glucose" value={form.glucose} onChange={onChange} placeholder="Glucose level in Sugar" /></td>
            </tr>
            <tr>
                <td><label for="blood_presure">Blood Pressure:</label></td>
                <td><input type="number" name="blood_presure" value={form.blood_presure} onChange={onChange} placeholder="Blood Pressure" /></td>
            </tr>
            <tr>
                <td><label for="skin_thickness">Skin Thickness:</label></td>
                <td><input type="number" name="skin_thickness" value={form.skin_thickness} onChange={onChange} placeholder="Skin Thickness" /></td>
            </tr>
            <tr>
                <td><label for="insulin_level">Insulin Level:</label></td>
                <td><input type="number" name="insulin_level" value={form.insulin_level} onChange={onChange} placeholder="Insulin Level" /></td>
            </tr>
            <tr>
                <td><label for="bmi">Body Mass Index (BMI):</label></td>
                <td><input type="number" name="bmi" value={form.bmi} onChange={onChange} placeholder="Body Mass Index (BMI)" /></td>
            </tr>
            <tr>
                <td><label for="diabetes_pedigree">Diabetes Pedigree Function:</label></td>
                <td><input type="number" name="diabetes_pedigree" value={form.diabetes_pedigree} onChange={onChange} placeholder="Diabetes Pedigree Function" /></td>
            </tr>
            <tr>
                <td><label for="age">Age:</label></td>
                <td><input type="number" name="age" value={form.age} onChange={onChange} placeholder="In years" /></td>
            </tr>
        </table>
        <button type="submit" disabled={loading}>{loading ? "Predicting Result..." : "Submit Form"}</button>
        {result && <span onClick={handleClear}>Clear Prediction</span>}

        {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
    </form>
    );
}

export default Form;