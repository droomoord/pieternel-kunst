import classes from "./InfoDrawer.module.css";
import Filter from "../Filter/Filter";

const infoDrawer = ({ filter, changed }) => {
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.wrapper2}
        style={filter ? { top: "100px" } : null}
      >
        {filter && <Filter changed={changed} />}

        <div className={classes.locatie}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2398.2392332059408!2d4.794509815887267!3d53.052008779918346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf30bed6fa9711%3A0xb2f7bb0550747668!2sElemert%2016%2C%201791%20DD%20Den%20Burg!5e0!3m2!1sen!2snl!4v1633867894884!5m2!1sen!2snl"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
          <address>
            Ateliergalerie de Garage
            <br />
            Elemert 16
            <br />
            1791 DD Den Burg
            <br />
            Texel
          </address>
        </div>
        <p className={classes.info}>
          De Garage bevindt op een locatie die supergoed bereikbaar is,
          tegenover de bushalte van Den Burg en aan een parkeerplaats. Op
          woensdagmiddag tussen 2 en 5 uur is de galerie open. In de maanden
          juli en augustus al vanaf 11 uur want dan is in het centrum tevens
          zomermarkt. Op afspraak via{" "}
          <a href="mailto:pieternelgeurtz@gmail.com" target="_blank">
            pieternelgeurtz@gmail.com
          </a>{" "}
          ben je ook van harte welkom.
        </p>
      </div>
    </div>
  );
};

export default infoDrawer;
