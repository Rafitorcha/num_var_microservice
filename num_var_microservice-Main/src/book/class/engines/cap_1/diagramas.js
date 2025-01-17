class Engine extends BaseEngine {
  constructor(def,defBoard) {
    super(defBoard);
    this.defBoard = defBoard
    this.idTemplate = def.tmp
    // this.conditions = definition.conditions;
    this.allPoints = [];
    this.tmp = document.querySelector(`#${this.idTemplate}`)
    this.htmlNode = this.tmp.content.firstElementChild.cloneNode(true)
    this.boardContent = this.htmlNode.querySelector(".board")
    this.boardContent.id = def.id
    ///////////////////////////////////////////
    this.valueDefault = def.valuesDefault

    //////////////////////////////////////////////
    this.content = document.querySelector(def.content)
    this.bool2 = false
    this.boardTypes(def.type)
    //template string
    this.boardId = def.id
    //ya no va, se necesita dinamico
    this.content.appendChild(this.htmlNode)
  }
  templateInsert = () => {
    if (!document.querySelector(`#${this.idTemplate}`)) {
      document.body.insertAdjacentHTML('afterend', $templateDefaults);
    }
    return this.htmlNode
  }
  boardTypes(type = 1) {
    const {
      inputA,
      inputB,
      inputC,
      inputD,
      inputE,
      inputF,
      inputG,
    } = this.valueDefault
    //dejalo quieto
    switch (type) {
      case 1:


        this.lines = [
          [[-3, 2.5], [-3, 1.5]],
          [[0, 2.5], [0, 1.5]],
          [[0, 1.5], [-1.5, 1.5]],
          [[-3, 1.5], [-1.5, 1.5]],
          [[3, -1.5], [-1.5, -1.5]],
          { styles: { lastArrow: true }, position: [[0, -1.5], [0, -3]] },
          { styles: { lastArrow: true }, position: [[-1.5, 1.5], [-1.5, 0.5]] },
          [[3, 2.5], [3, -1.5]],
          [[-1.50, -1], [-1.50, -1.50]],
        ]
        this.array = [
          { x: -3.8, y: 2.5, value: inputA },
          { x: -0.8, y: 2.5, value: inputB },
          { x: 2.2, y: 2.5, value: inputC },
          { x: -0.8, y: -4.5, value: inputD },
          { x: -2.3, y: -1, value: inputE },
          { x: -1.9, y: 2, value: inputF, type: 2 },
          { x: -0.4, y: -1, value: inputG, type: 2 },
        ]

        break;
      case 2:

        this.lines = [
          [[3, 2.5], [3, 1.5]],
          [[0, 2.5], [0, 1.5]],
          [[0, 1.5], [1.5, 1.5]],
          [[3, 1.5], [1.5, 1.5]],
          [[-3, -1.5], [1.5, -1.5]],
          { styles: { lastArrow: true }, position: [[0, -1.5], [0, -3]] },
          { styles: { lastArrow: true }, position: [[1.5, 1.5], [1.5, 0.5]] },
          [[-3, 2.5], [-3, -1.5]],
          [[1.50, -1.5], [1.50, -1]],
        ]
        this.array = [
          { x: -3.8, y: 2.5, value: inputA },
          { x: -0.8, y: 2.5, value: inputB},
          { x: 2.2, y: 2.5, value: inputC},
          { x: 0.7, y: -1, value: inputD},
          { x: -0.8, y: -4.5, value: inputE},
          { x: 1.1, y: 2, value: inputF, type: 2 },
          { x: -0.4, y: -1, value: inputG, type: 2 },
        ]

        break;
      case 3:
        this.lines = [
          [[-1.5, 2.5], [-1.5, 1.5]],
          [[1.5, 2.5], [1.5, 1.5]],
          [[0, 1.5], [1.5, 1.5]],
          [[-1.5, 1.5], [1.5, 1.5]],
		  { styles: { lastArrow: true }, position: [[0, 1.5], [0, 0.5]] },
          { styles: { lastArrow: true }, position: [[0, -1], [0, -3]] },
        ]
        this.array = [
          { x: -2.3, y: 2.5, value: inputA },
          { x: 0.7, y: 2.5, value:inputB},
          { x: -0.8, y: -4.5, value: inputC },
          { x: -0.8, y: -1, value: inputD },
          { x: -0.4, y: 2, value: inputE, type: 2 },
        ]
        break
      case 4:
        this.lines = [
          [[-1.5, 2.5], [-1.5, 0.8]],
          [[1.5, 2.5], [1.5, 0.8]],
          [[-1.5, 0.8], [1.5, 0.8]],
          { styles: { lastArrow: true }, position: [[0, 0.8], [0, -0.4]] },

        ]
        this.array = [
          { x: -2.3, y: 2.5, value: inputA },
          { x: 0.7, y: 2.5, value: inputB },
          { x: -0.8, y: -1.9, value: inputC },
          { x: -0.4, y: 1.5, value: inputD, type: 2 },
        ]
        break
      //si
      default:
        break;
    }
  }
  initEngine() {
    this.initTimer(this.htmlNode)
    //const allPoint = []

    this.board = JXG.JSXGraph.initBoard(this.boardContent.id,
      {
        showcopyright: false,
		shownavigation: false,
        boundingbox: [-5, 5, 5, -5],
        axis: this.bool2,
        ticks: { visible: false },
		pan: {
		enabled: false,   // Allow panning
		needTwoFingers: true, // panning is done with two fingers on touch devices
		needShift: true, // mouse panning needs pressing of the shift key
		},
		zoom: {
        needShift: false,
        pinchHorizontal: false,
        pinchVertical: false,
        pinchSensitivity: 0,
        min: 1000,
        max: 0,
        factorX: 0,
        factorY: 0,
        wheel: false,
      },

      });


    this.lines.forEach(element => {

      if (Array.isArray(element)) {
        this.linesPoint(element)
      } else {
        this.linesPoint(element.position, element.styles)
      }
    })

    this.array.forEach((element) => {

      //destructurado
      const { x, y, value, type } = element
      //invocación sin "element"
      this.createInput1(x, y, value, type)
    })

  }


  linesPoint(position, style) {
    this.board.create('line', position,
      {
        strokecolor: 'blue',
        strokeWidth: 2,
        straightFirst: false,
        straightLast: false,

        fixed: true,
        ...style
      })

  }

  createInput1(x, y, text, type = 1) {
    return this.board.create(
      "fo",
      [`<math-field value='${text ?? " "}' ${!text ? " ":'disabled'} 
	  class='${type == 1 ? `inputClass` : `inputCuadrado`}'></math-field>`,[x, y]],
      {
        anchorX: "middle",
        anchorY: "middle",
        fixed: true,
        layer: 70,
        fontSize: 8,
        fontUnit: 'vmin',
      }
    );
  }

}
