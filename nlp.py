import spacy
import re
import fitz  # PyMuPDF for extracting text from PDF
import pandas as pd

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Define ESG-related keywords and patterns
esg_keywords = {
    "CO2_Reduction": ["carbon reduction", "CO2 reduction", "emissions reduced", "GHG reduction"],
    "Renewable_Energy": ["renewable energy", "solar energy", "wind energy"],
    "Job_Creation": ["job creation", "employment generated", "jobs created"],
    "Transparency": ["transparency", "accountability", "reporting standards"],
    "Waste_Management": ["waste management", "recycling", "waste reduction"]
}

# Regex patterns to extract percentage values and numbers
percentage_pattern = r"(\d+(\.\d+)?)%?"
number_pattern = r"(\d{1,3}(?:,\d{3})*(?:\.\d+)?)"  # Matches numbers with commas

# Function to extract ESG metrics from the report
def extract_esg_metrics(report_text):
    # Apply spaCy NLP model to the report
    doc = nlp(report_text)
    
    # Dictionary to store extracted data
    extracted_data = {
        "CO2_Reduction": None,
        "Renewable_Energy": None,
        "Job_Creation": None,
        "Transparency": None,
        "Waste_Management": None
    }
    
    for metric, keywords in esg_keywords.items():
        for sent in doc.sents:
            if any(re.search(rf'\b{keyword}\b', sent.text, re.IGNORECASE) for keyword in keywords):
                # Check for percentages and numbers in sentences
                if metric == "CO2_Reduction":
                    match = re.search(percentage_pattern, sent.text)
                    if match:
                        extracted_data[metric] = match.group(1) + "%"
                elif metric == "Job_Creation":
                    match = re.search(number_pattern, sent.text)
                    if match:
                        extracted_data[metric] = match.group(1)
                elif metric == "Waste_Management":
                    match = re.search(percentage_pattern, sent.text)
                    if match:
                        extracted_data[metric] = match.group(1) + "%"
                else:
                    # For other metrics, store relevant details (keywords, but no full sentences)
                    extracted_data[metric] = "Found"
    
    return extracted_data

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# Function to save the extracted ESG data to a CSV file
def save_to_csv(extracted_data, output_csv):
    # Convert extracted data into a pandas DataFrame
    df = pd.DataFrame([extracted_data])
    
    # Save DataFrame to CSV
    df.to_csv(output_csv, index=False)

# Example usage
pdf_path = "path_to_your_report.pdf"  # Replace with your PDF file path
output_csv = "corrected_esg_metrics.csv"  # Output CSV file name

# Extract text from the PDF
report_text = extract_text_from_pdf('sample_esg_report.pdf')

# Analyze the report and extract ESG metrics
esg_data = extract_esg_metrics(report_text)

# Save the extracted data to CSV
save_to_csv(esg_data, output_csv)

print("ESG Metrics extracted and saved to CSV successfully.")
