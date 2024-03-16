/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package jJj;

import entidades.Alumno;

/**
 *
 * @author Angel
 */
public class JsonMensaje {
    String Emisor;
    String Destinatario;
    String Mensaje;
    Alumno Alumno;

    public JsonMensaje(String Emisor, String Destinatario, String Mensaje, Alumno alumno) {
        this.Emisor = Emisor;
        this.Destinatario = Destinatario;
        this.Mensaje = Mensaje;
        this.Alumno = alumno;
    }

    public String getEmisor() {
        return Emisor;
    }

    public void setEmisor(String Emisor) {
        this.Emisor = Emisor;
    }

    public String getDestinatario() {
        return Destinatario;
    }

    public void setDestinatario(String Destinatario) {
        this.Destinatario = Destinatario;
    }

    public String getMensaje() {
        return Mensaje;
    }

    public void setMensaje(String Mensaje) {
        this.Mensaje = Mensaje;
    }

    public Alumno getAlumno() {
        return Alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.Alumno = alumno;
    }
}
