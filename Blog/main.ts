import { loadJson } from "./loadfile.js";


const probTable: HTMLTableElement = document.querySelector('#prob_table');
const probInput: HTMLTextAreaElement = document.querySelector('#problem');
const ansInput: HTMLTextAreaElement = document.querySelector('#answer');

const ansButton: HTMLButtonElement = document.querySelector('#toggle_ans');
var isOpen: boolean = true;
ansButton.addEventListener('click', (e) => {
    isOpen = !isOpen;
    problems.forEach((problem) => {
        problem.toggleAnswer(isOpen);
    })
})

const problems: Array<Problem> = new Array<Problem>();

const addButton: HTMLButtonElement = document.querySelector('#prob_add');
addButton.addEventListener('click', (e) => {
    problems.push(new Problem(probInput.value, ansInput.value));
    probInput.value = '';
    ansInput.value = '';
})

const loadButton: HTMLButtonElement = document.querySelector('#load');
loadButton.addEventListener('click', (e) => {
    const load = loadJson();
    load.forEach(element => {
        problems.push(new Problem(element['prob'], element['ans']));
    });
    console.log(problems);
})

const saveButton: HTMLButtonElement = document.querySelector('#save');
saveButton.addEventListener('click', (e) => {
    const saveJson = [];
    problems.forEach((problem) => {
        saveJson.push({prob: problem.problem, ans: problem.answer});
    })
    console.log(saveJson);
})

class Problem
{
    problem: string;
    answer: string;
    ansElement: HTMLElement;

    constructor(prob: string, ans: string)
    {
        this.problem = prob;
        this.answer = ans;
        const newProb = document.createElement('tbody');
        newProb.innerHTML = `
            <td>${this.problem}</td>
            <td>${this.answer}</td>
            <td><textarea></textarea></td>
        `
        this.ansElement = newProb.getElementsByTagName('td')[1];
        probTable.appendChild(newProb);
    }

    toggleAnswer(isOpen: boolean)
    {
        if(isOpen)
        {
            this.ansElement.innerText = this.answer;
        }
        else
        {
            this.ansElement.innerText = '';
        }
    }
}
