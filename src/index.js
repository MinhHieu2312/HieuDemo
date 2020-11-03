const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

//Template Engine
app.engine('hbs', hbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.post('/', (req, res) => {
  const pa1_value = req.body.expr1;
  const pa2_value = req.body.expr2;
  const operator = req.body.operation;
  
  if(operator==null){
    var notify_value = "Bạn chưa chọn phép tính";
  }

  if(isNaN(pa2_value)){
    var notify_value = "Giá trị ở ô thứ hai phải là số";
  }

  if(isNaN(pa1_value)){
    var notify_value = "Giá trị ở ô thứ nhất phải là số";
  }

  if(pa2_value==""){
    var notify_value = "Bạn chưa nhập giá trị cho ô thứ hai";
  }

  if(pa1_value==""){
    var notify_value = "Bạn chưa nhập giá trị cho ô thứ nhất";
  }
  
  var result = "";
  let para1Value = parseFloat(pa1_value);
  let para2Value = parseFloat(pa2_value);
  switch(operator){
    case "Cong":
        result = para1Value + para2Value;
        break;

    case "Tru":
        result = para1Value - para2Value;
        break;

    case "Nhan":
        result = para1Value * para2Value;
        break;

    case "Chia":
        result = para1Value / para2Value;
        break;

    default:
        break;
  }
  res.render('home',{pa1_value: pa1_value, pa2_value: pa2_value, notify_value: notify_value, result_value: result});
})




