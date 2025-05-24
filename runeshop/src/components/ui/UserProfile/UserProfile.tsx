import React from 'react'
import styles from './UserProfile.module.css'

export const UserProfile = () => {
  return (
    
      <div className={styles.principalContainerUserProfile}>
        <div className={styles.dataContainerUserProfile}>
          <div className={styles.userDataForm}>
            <div className={styles.userIconForm}>
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className={styles.userDataFormInputs}>
              <input type="text" name="user" placeholder="Nombre de usuario" />
              <input type="text" name="name" placeholder="Nombre" />
              <input type="text" name="lastName" placeholder="Apellido" />
              <input type="text" name="mail" placeholder="Correo electrónico" />
              <input type="number" name="dni" placeholder="DNI" />
            </div>
          </div>
          <div className={styles.userAdressesForm}>
            <h2>Direcciones registradas</h2>
            <div className={styles.userAdressesInformation}>
              <div className={styles.userAdresses}>
                <p>1FALTA condicional de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>2FALTA condicional llllllllllllllll lññññllllllllñññññññññññññññlllllllllllllll llll de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>3FALTA condicional de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>4FALTA condicional de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>5FALTA condicional de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>6FALTA condicional llllllllllllllll lññññllllllllñññññññññññññññlllllllllllllll llll de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>7FALTA condicional de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className={styles.userAdresses}>
                <p>8FALTA condicional de vacias Dirección de ejemplo</p>
                <div className={styles.userAdressesButtons}>
                  <button className={styles.userAdressesEditButton}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={styles.userAdressesDeleteButton}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.userAdressesAddButton}>
              <button> Agregar dirección</button>
            </div>
          </div>
        </div>
      </div>
  )
}
