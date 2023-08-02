import React, { useState, useRef } from 'react'



const Welcom = (props) => {

  
  return (
    <>
      <div class='header1'>
        <div class='left1'>
          <b>
            <p>
              République Tunisienne <br />
              الجمهورية التونسية
            </p>
          </b>
        </div>
        <div class='center1'>
          <img
            src='assets/istockphoto-1180612941-612x612.jpg'
            alt='Flag of Tunisia'
          />
        </div>
        <div class='right1'>
          <b>
            <p>
              L'hospital Régional de Jendouba
              <br />
              المستشفى الجهوي بجندوبة
            </p>
          </b>
        </div>
      </div>
      <div class='center1'>
        <img src='assets/jendouba-1.jpg' alt='Image' class='centtt' />
        <br />
        <br />
        <p class='p1'>
          <b>Bienvenu à Votre Hôpital</b>{' '}
        </p>
      </div>
      <div class='container1'>
        <div>
          <img src='assets/images.jpg' alt='Image' class='centtt' id='image1' />
          <img src='assets/rea.jpg' alt='Image' class='centtt' id='image2' />
        </div>
        <p>
          L'Hôpital régional de Jendouba est un établissement de santé situé
          <br />
          dans la région de Jendouba en Tunisie. C'est un hôpital de référence
          <br />
          qui offre une gamme complète de services médicaux aux habitants <br />
          de la région et des zones environnantes.
        </p>
      </div>
      <div class='button-container1'>
        <a href="/login" class='btn btn-success'>Admin</a>&nbsp;&nbsp;
        <a href="/connexion"class='btn btn-success'>Staffes</a>
      </div>
      <br />
      <div class='footer1'>
        <p>Avenue de l'UMA 8100, JENDOUBA JENDOUBA Tunisie</p>
      </div>
    </>
  )
}
export default Welcom
