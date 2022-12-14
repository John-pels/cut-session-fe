class SessionWidget {
  position;
  open;
  calendarIcon;
  closeIcon;
  widgetContainer;

  constructor({ position = "bottom-right" }) {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.createStyles();
  }

  URL = `https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856/studios`;

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }
  initialize() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const calendarIcon = document.createElement("img");
    calendarIcon.src = "/calendar.svg";
    calendarIcon.setAttribute("alt", "calender-icon");
    calendarIcon.classList.add("icon");
    this.calendarIcon = calendarIcon;

    const closeIcon = document.createElement("img");
    closeIcon.src = "/cross.svg";
    calendarIcon.setAttribute("alt", "cross-icon");
    closeIcon.classList.add("icon", "hidden");
    this.closeIcon = closeIcon;

    buttonContainer.appendChild(this.calendarIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("hidden", "widget-container");

    this.createWidgetContainerContent();

    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);
  }

  async createWidgetContainerContent() {
    this.widgetContainer.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = `Book a Session with us here`;

    const weekDayGrid = document.createElement("div");
    const weekEndGrid = document.createElement("div");
    weekDayGrid.classList.add("grid");
    weekEndGrid.classList.add("grid");
    const weekDayTitle = document.createElement("h4");
    const weekEndTitle = document.createElement("h4");
    weekDayTitle.textContent = `Weekday Sessions`;
    weekEndTitle.textContent = `Weekend Sessions`;

    const widgetScript = document.querySelector("[data-widget]");
    const merchantId = widgetScript.getAttribute("data-merchantId");
    const response = await fetch(`${this.URL}/${merchantId}`, {
      headers: {
        prefer: "code=200, dynamic=true",
      },
    });
    const jsonData = await response.json();

    const renderWeekDaySessions = () => {
      const weekdaySessions = this.filterDataByKeyAndValue(
        jsonData,
        "type",
        "weekDay"
      );
      const sessions = weekdaySessions
        ?.map((session) => {
          return `
        <a href="${window.location.origin}/dashboard/book/${session.id}" key="${session.id}" class="grid-item" target="__blank">
       ${session.startsAt} - ${session.endsAt}
        </a>
      `;
        })
        .join("");

      weekDayGrid.innerHTML = sessions;
    };

    const renderWeekEndSessions = () => {
      const weekendSessions = this.filterDataByKeyAndValue(
        jsonData,
        "type",
        "weekEnd"
      );
      const sessions = weekendSessions
        ?.map((session) => {
          return `
        <a href="${window.location.origin}/dashboard/book/${session.id}" key="${session.id}" class="grid-item" target="__blank">
       ${session.startsAt} - ${session.endsAt}
        </a>
      `;
        })
        .join("");

      weekEndGrid.innerHTML = sessions;
    };

    renderWeekDaySessions();
    renderWeekEndSessions();

    this.widgetContainer.appendChild(title);
    this.widgetContainer.appendChild(weekDayTitle);
    this.widgetContainer.appendChild(weekDayGrid);
    this.widgetContainer.appendChild(weekEndTitle);
    this.widgetContainer.appendChild(weekEndGrid);
  }

  createStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
    @import url("https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
              * {
              font-family: "Poppins", sans-serif;
              }
            .icon {
                cursor: pointer;
                width: 70%;
                position: absolute;
                top: 9px;
                left: 9px;
                transition: transform .3s ease;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
                background-color: #6268bf;
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .widget-container {
                background-color: #fff;
                box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                border-radius: 5px;
                width: 430px;
                right: -15px;
                bottom: 75px;
                max-height: 600px;
                overflow-y:scroll;
                position: absolute;
                transition: max-height .2s ease-in-out;
            }
            .widget-container.hidden {
                max-height: 0px;
            }
            .widget-container h2 {
                margin: 0;
                padding: 20px 20px;
                color: #fff;
                background-color: #6268bf;
                font-weight: 600;
            }
            .widget-container .content {
                margin: 20px 10px;
                border: 1px solid green;
                padding: 10px;
                display: flex;
                background-color: #ebffef;
                flex-direction: column;
            }
              h4 {
              color:rgb(101, 98, 98);
              margin: 10px;
                }
            .grid {
              display:grid;
              grid-template-columns: repeat(2,1fr);
              gap: 5px;
              padding: 10px;
              padding-top:0;
            }
            .grid-item {
              border: 0.5px solid rgb(101, 98, 98);
              border-radius: 5px;
              background: #ebffef;
              text-decoration: none;
              color:rgb(101, 98, 98);
              font-size: 0.8em;
              padding: 5px;
              cursor:pointer;
            }
            
             @media (max-width: 450px) {
                .widget-container {
                max-height: 600px;
                width: 400px;
               }
             }


            @media (max-width: 400px) {
               .grid {
               grid-template-columns: 1fr;
               }
                .widget-container h2  {
                  font-size:1.2em;
                  padding: 15px 15px;
                }
               .widget-container {
                max-height: 650px;
                width: 300px;
               }
            }      
    `.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.calendarIcon.classList.add("hidden");
      this.closeIcon.classList.remove("hidden");
      this.widgetContainer.classList.remove("hidden");
    } else {
      this.createWidgetContainerContent();
      this.calendarIcon.classList.remove("hidden");
      this.closeIcon.classList.add("hidden");
      this.widgetContainer.classList.add("hidden");
    }
  }

  filterDataByKeyAndValue = (data, key, value) => {
    const result = data?.filter(
      (item) => item[key].toLowerCase() === value.toLowerCase()
    );
    return result;
  };
}

const sessionWidget = new SessionWidget({ position: "bottom-right" });
