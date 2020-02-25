package ukahootapi;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class EnviarEncuestaReponseJSON {
	private String response;

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}
	
}
