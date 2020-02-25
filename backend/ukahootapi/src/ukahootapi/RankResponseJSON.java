package ukahootapi;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class RankResponseJSON {
	private String poll_name;
	private List<Rank> ranks;
	
	public String getPoll_name() {
		return poll_name;
	}
	public void setPoll_name(String poll_name) {
		this.poll_name = poll_name;
	}
	public List<Rank> getRanks() {
		return ranks;
	}
	public void setRanks(List<Rank> ranks) {
		this.ranks = ranks;
	}
}
