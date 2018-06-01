$(document).ready(function(){

// Переменные, заполняем, определяем
age = prompt("Введите ваш возраст", 18);
name = prompt("Введите ваше имя: ", "Jhon Doe");
var player1 = new Player(name, age),
	monster = new Player("Ghule", age),
	accept = false,
	monsterFigure = document.getElementById('monster');
	playerFigure = document.getElementById('player');
	round = $('.stat .round');
	monsterNumber = $('.monster-figure .number');
	playerNumber = $('.player-figure .number');


function Player(name, age ) {
	this.name = name;
	this.age = age;
	this.health=100;

	// Удар
	this.punch = function(){
		return getRandomHurt(10, 30);
	}

	// Получение удара
	this.hurt = function(hurtxp){
		this.health = this.health - hurtxp;
		return this.health;
	}

	// Возвращает текущее здоровье обьекта
	this.getHealth = function(){
		return this.health;
	}

	// Функция генерации рандомного целого числа
	getRandomHurt = function (min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	// Возвращает имя объекта
	this.getName = function(){
		return this.name;
	}

	// Возвращает возраст
	this.getAge = function(){
		return Number(this.age);
	}
}

// Возрастное ограничение
if(player1.getAge()>=12 && player1.getAge()<=16){
	accept = confirm("Игра возможна только под присмотром родителей!");
} else if (player1.getAge()>=18){
	accept = true;
} else if (player1.getAge()>0 && player1.getAge()<12){
	alert(player1.getName() + " извините но игра доступна только с 12 ти лет ");
	accept = false;
}

	var j=1,
		health1=100,
		health2=100;
	$(round).text('Раунд: ' + j);
	// Если возраст подходящий
	if(accept){

			var handler = function (){
				j++;
				$(round).text('Раунд: ' + j);
				hit = player1.punch();
				monster.hurt(hit);
				health2 = monster.getHealth();
				// $(monsterFigure).effect("bounce", {times: 3}, 300);
				$('.monster .health').width(health2);
				$(monsterNumber).text(health2);
				hit = monster.punch();
				player1.hurt(hit);
				health1 = player1.getHealth();
				$('.player .health').width(health1);
				$(playerNumber).text(health1);
				checkScore(j);

			};

			monsterFigure.addEventListener( "click", handler, false);
			
		}

		function checkScore(j){
			if(j==6 || health1<=0 || health2<=0){
				monsterFigure.removeEventListener( "click", handler, false);
				
				//Вывод результатов
				if(health1>0 && health2<=0){
					$(monsterNumber).text('ПОТРАЧЕНО');
					$(monsterFigure).fadeOut(3400);
					alert("Поздравляю," + player1.getName() + " вы выжили в сватке, монстр повержен!");
					console.log("Поздравляю," + player1.getName() + " вы выжили в сватке, монстр повержен!");
				}else if(health1<=0 && health2<=0){
					alert(player1.getName() + " вы получили критический удар в голову и скончались!");
					alert(monster.getName() + " получил критический удар в голову и скончался!");
					$(playerNumber).text('ПОТРАЧЕНО');
					$(monsterNumber).text('ПОТРАЧЕНО');
					$(playerFigure).fadeOut(3400);
					$(monsterFigure).fadeOut(3400);
					console.log(player1.getName() + " вы получили критический удар в голову и скончались!");
					console.log(monster.getName() + " получил критический удар в голову и скончался!");
				}else if(health1>0 && health2>0){
					alert(player1.getName() + " приглашаем вас сыграть еще раз! Ничья!!");
					console.log(player1.getName() + " приглашаем вас сыграть еще раз! Ничья!!");
				}else if(health1<=0 && health2>0){
					$(playerNumber).text('ПОТРАЧЕНО');
					$(playerFigure).fadeOut(3400);
					alert(player1.getName() + " вы получили критический удар в голову и скончались!");
					console.log(player1.getName() + " вы получили критический удар в голову и скончались!");
				}else if(health1<=0 && health2>0){
					$(playerNumber).text('ПОТРАЧЕНО');
					$(playerFigure).fadeOut(3400);
					alert(player1.getName() + " вы получили критический удар в голову и скончались!");
					console.log(player1.getName() + " вы получили критический удар в голову и скончались!");
				}

			} else {

			}
		}
});
