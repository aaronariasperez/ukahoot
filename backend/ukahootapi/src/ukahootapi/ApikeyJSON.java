package ukahootapi;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ApikeyJSON {
	private String apikey;

	public String getApikey() {
		return apikey;
	}

	public void setApikey(String apikey) {
		this.apikey = apikey;
	}
	
}
