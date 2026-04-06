import fitz # PyMuPDF

def extract_text_from_pdf(file_byte: bytes) -> str:
    """
    Extracts text from a PDF file using PyMuPDF.
    """
    text = ""

    # Open PDF from memory (instead of saving file)
    with fitz.open(stream=file_byte, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()

    return text.strip()
