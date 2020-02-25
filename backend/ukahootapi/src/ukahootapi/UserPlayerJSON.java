package ukahootapi;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserPlayerJSON {
	private String user;
	private String apikey;
	
	public String getUser() { return this.user; }
	public void setUser(String usr) { this.user = usr; }
	
	public String getApikey() { return this.apikey; }
	public void setApikey(String apikey) { this.apikey = apikey; }
}
