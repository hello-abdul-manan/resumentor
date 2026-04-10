import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Load variables from .env file
load_dotenv()

# Create OpenAI client using API key from environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), base_url="https://api.groq.com/openai/v1")

def analyze_resume(text: str) -> str:
    """
    Analyze resume using LLM and return structured JSON output.
    """

    # Create prompt
    prompt = f"""
    You are an expert technical recruiter.
    
    Analyze the following resume and return ONLY valid JSON in this format:
    
    {{
        "score": (0-100),
        "strengths": [],
        "weaknesses": [],
        "missing_skills": [],
        "suggestions": []
    }}
    
    Rules:
    - No explanation outside JSON
    - Be concise and specific
    - Score should reflect real-world hiring standards
    
    Resume:
    {text[:3000]}
    """

    # Send request to OpenAI model
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You return only JSON."}, # Set AI behavior
            {"role": "user", "content": prompt} # Send actual prompt
        ],
        temperature=0.5
    )

    # Store AI-generated response text
    content = response.choices[0].message.content

    # Convert text into JSON format safely
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {"error": "Something went wrong. Please try again."}
