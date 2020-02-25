package ukahootapi;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.lang.JoseException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Path("/api")
public class Ukahoot {
	private static Map<String, UserRegisteredJSON> userRegistered_map = new HashMap<String, UserRegisteredJSON>();
	private static Map<String, UserPlayerJSON> userPlayer_map= new HashMap<String, UserPlayerJSON>();
	private static Map<String, PollJSON> polls_map = new HashMap<String, PollJSON>();
	private static int polls_id = 0;
	private static Map<String, RankResponseJSON> ranks_map = new HashMap<String, RankResponseJSON>();
	
	static {
		UserRegisteredJSON user = new UserRegisteredJSON();//"creador", "creadorpass", "");
		user.setUser("creador");
		user.setPass("creadorpass");
	
		userRegistered_map.put(user.getUser(), user);
	}
	
	//*****JUGAR ENCUESTA******
	@POST
	@Path("/getApikey")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ApikeyJSON getApikey(UserPlayerJSON myUser) {
		if(!userPlayer_map.containsKey(myUser.getUser_name())) {
			UUID apikey = UUID.randomUUID();
			UserPlayerJSON newUser = new UserPlayerJSON();
			newUser.setUser_name(myUser.getUser_name());
			newUser.setApikey(apikey.toString());
			userPlayer_map.put(newUser.getUser_name(), newUser); 
			
			ApikeyJSON response = new ApikeyJSON();
			response.setApikey(apikey.toString());
			
			return response;
		}
		ApikeyJSON response = new ApikeyJSON();
		response.setApikey(userPlayer_map.get(myUser.getUser_name()).getApikey());
		return response;
	}
	
	@POST
	@Path("/play")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PlayResponseJSON play(UserPlayerJSON myUser) {
		if(userPlayer_map.get(myUser.getUser_name()).getApikey().equals(myUser.getApikey())) {
			PlayResponseJSON response = new PlayResponseJSON();
			response.setApikey(myUser.getApikey());
			response.setPoll_id(myUser.getPoll_id());
			response.setPoll_name(polls_map.get(myUser.getPoll_id()).getPoll_name());
			response.setQuestions(polls_map.get(myUser.getPoll_id()).getQuestions());
			
			return response;
		}else {
			return null;
		}
	}
	
	@POST
	@Path("/enviar_respuestas")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public EnviarEncuestaReponseJSON enviar_respuestas(EnviarEncuestaJSON encuesta) {
		if(userPlayer_map.get(encuesta.getUser_name()).getApikey().equals(encuesta.getApikey())) {
			int score = 0;
			for(int i = 0; i < encuesta.getAnswers().size();i++) {
				if(polls_map.get(encuesta.getPoll_id()).getQuestions().get(i).getSolution().endsWith(Integer.toString(encuesta.getAnswers().get(i)))) {
					score += 10;
				}
			}
			
			Rank r = new Rank(encuesta.getUser_name(), score);
			
			ranks_map.get(encuesta.getPoll_id()).getRanks().add(r);
			
			EnviarEncuestaReponseJSON response = new EnviarEncuestaReponseJSON();
			response.setResponse("Respuestas enviadas correctamente");
			
			return response;
		}else {
			EnviarEncuestaReponseJSON response = new EnviarEncuestaReponseJSON();
			response.setResponse("Acceso denegado");
			return response;
		}
	}
	
	//*****AUTH Y CREAR ENCUESTA*****
	

	@Path("/auth")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	//public Response auth(UserRegisteredJSON user_input) 
	public MessageJSON auth(UserRegisteredJSON user_input) 
		throws JsonGenerationException, JsonMappingException, IOException{
		
		if(userRegistered_map.containsKey(user_input.getUser()) && userRegistered_map.get(user_input.getUser()).getPass().equals(user_input.getPass())){
			UserRegisteredJSON user = userRegistered_map.get(user_input.getUser());
			RsaJsonWebKey jwk = null;
			try {
				jwk= RsaJwkGenerator.generateJwk(2048); 
				jwk.setKeyId("1");
			} catch (JoseException e) {   
				e.printStackTrace();  
			}
			JwtClaims claims= new JwtClaims();
			claims.setIssuer("uca");
			claims.setExpirationTimeMinutesInTheFuture(10);
			claims.setGeneratedJwtId();
			claims.setIssuedAtToNow();
			claims.setNotBeforeMinutesInThePast(2);
			claims.setSubject(user_input.getUser());
			claims.setStringListClaim("roles", "basicRestUser"); 
			JsonWebSignature jws= new JsonWebSignature();
			jws.setPayload(claims.toJson());
			jws.setKeyIdHeaderValue(jwk.getKeyId());
			jws.setKey(jwk.getPrivateKey());
			jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256); 
			String jwt= null;
			try {
				jwt = jws.getCompactSerialization();
			} catch (JoseException e) {
				System.out.println(e);
			}
			user.setJWK(jwk);
			MessageJSON msj = new MessageJSON();
			msj.setMessage("Token creado");
			msj.setToken(jwt);
			
			return msj;
		}else {
			return null;
		}	
	}

	@POST 
	@Path("/encuesta")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PollResponseJSON poll(PollJSON poll, @HeaderParam("token") String token, @HeaderParam("user") String user) 
		throws JsonGenerationException, JsonMappingException, IOException{
		
		JsonWebKey jwk = userRegistered_map.get(user).getJWK();
		JwtConsumer jwtConsumer = new JwtConsumerBuilder()
				.setRequireExpirationTime()
				.setAllowedClockSkewInSeconds(30)
				.setRequireSubject()
				.setExpectedIssuer("uca")
				.setVerificationKey(jwk.getKey()).build();
		try {
			JwtClaims jwtClaims = jwtConsumer.processToClaims(token);
			System.out.println("JWT validation succeeded! " + jwtClaims);
		}catch(InvalidJwtException e) {
			return null;
		}
		RankResponseJSON rankresponse = new RankResponseJSON();
		rankresponse.setPoll_name(poll.getPoll_name());
		rankresponse.setRanks(new ArrayList<Rank>());
		ranks_map.put(Integer.toString(polls_id), rankresponse);
		
		PollResponseJSON response = new PollResponseJSON();
		String generated = Integer.toString(polls_id);
		polls_id++;
		poll.setPoll_id(generated);
		polls_map.put(generated, poll);
		response.setPoll_id(generated);
		return response;
	}

	//*****RANKING*****
	
	@GET
	@Path("/ranking/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RankResponseJSON ranking(@PathParam("id") String id) {
		return ranks_map.get(id);
	}
}
