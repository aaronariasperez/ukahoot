package ukahootapi;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class PollResponseJSON {
	private String poll_id;

	public String getPoll_id() {
		return poll_id;
	}

	public void setPoll_id(String poll_id) {
		this.poll_id = poll_id;
	}
}
