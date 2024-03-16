package ws;

import jakarta.websocket.EncodeException;
import jakarta.websocket.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jJj.JsonMensaje;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author JGLAM
 */
@ServerEndpoint("/wsendpoint")
public class WebSocketEP {

    private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void onOpen(Session session) throws IOException, EncodeException {
        System.out.println("Open!" + session.getId());
        sessions.add(session);
        for (Session sess : sessions) {
            if (sess != session) {
                sess.getBasicRemote().sendText("Open: " + session.getId());
                session.getBasicRemote().sendText("Open: " + sess.getId());
            }
        }
        session.getBasicRemote().sendText("SessionID: " + session.getId());
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        System.out.println("Close!" + session.getId());
        sessions.remove(session);
        for (Session sess : sessions) {
            sess.getBasicRemote().sendText("Close: " + session.getId());
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        sessions.remove(session);
        throwable.printStackTrace();
    }

    @OnMessage
    public void onMessage(String jsonMensaje, Session session) throws IOException, EncodeException {
        System.out.println("Got signal - " + jsonMensaje + " from " + session.getId());
        Gson gson = new Gson();
        
        JsonMensaje json = gson.fromJson(jsonMensaje, JsonMensaje.class);

        String mensajeAEnviar = gson.toJson(json);

        if (json.getDestinatario().equals("Todos")) {
            for (Session sess : sessions) {
                if (!sess.equals(session)) {
                    sess.getBasicRemote().sendText(mensajeAEnviar);
                }
            }
        } else {
            String idAEnviar = json.getDestinatario();

            for (Session sess : sessions) {
                if (sess.getId().equals(idAEnviar)) {
                    sess.getBasicRemote().sendText(mensajeAEnviar);
                }
            }
        }
    }
}
