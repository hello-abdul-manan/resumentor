import os
from dotenv import load_dotenv
from openai import OpenAI

# Load variables from .env file
load_dotenv()

# Create OpenAI client using API key from environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), base_url="https://api.groq.com/openai/v1")

def analyze_resume(text: str) -> str:
    """
    Analyze resume text using AI and return feedback.
    """

    # Create prompt
    prompt = f"""
    You are an expert technical recruiter.
    
    Analyze the following resume and provide:
    1. Key strengths
    2. Weakness
    3. Missing skills
    4. Specific improvement suggestions
    
    Resume:
    {text[:3000]}
    """

    # Send request to OpenAI model
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a professional resume reviewer."}, # Set AI behavior
            {"role": "user", "content": prompt} # Send actual prompt
        ],
        temperature=0.5
    )

    # Return AI-generated response text
    return response.choices[0].message.content
