// מאזין אירוע לכל שדה קלט כדי לבצע חישובים בזמן אמת
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateResults);
});

// פונקציה לסנכרון ערכי הנכס בין המינופים השונים
function synchronizePropertyValues() {
    const propertyValue75 = parseFloat(document.getElementById('property-value-75').value) || 0;
    document.getElementById('property-value-60').value = propertyValue75;
    document.getElementById('property-value-40').value = propertyValue75;
}

// פונקציה לקבלת ערך קלט עם וולידציה
function getInputValue(id) {
    const input = document.getElementById(id);
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0) {
        input.classList.add('input-error');
        return 0;
    } else {
        input.classList.remove('input-error');
        return value;
    }
}

// פונקציה לחישוב התוצאות
function calculateResults() {
    // סנכרון ערכי הנכס
    synchronizePropertyValues();

    // Block 1: חישוב סה"כ הכנסה משפחתית
    const salary1Spouse = getInputValue('salary1-spouse');
    const salary1Partner = getInputValue('salary1-partner');
    const salary2Spouse = getInputValue('salary2-spouse');
    const salary2Partner = getInputValue('salary2-partner');
    const businessIncomeSpouse = getInputValue('business-income-spouse');
    const businessIncomePartner = getInputValue('business-income-partner');
    const rentalIncomeSpouse = getInputValue('rental-income-spouse');
    const rentalIncomePartner = getInputValue('rental-income-partner');
    const disabilityAllowanceSpouse = getInputValue('disability-allowance-spouse');
    const disabilityAllowancePartner = getInputValue('disability-allowance-partner');
    const alimonySpouse = getInputValue('alimony-spouse');
    const alimonyPartner = getInputValue('alimony-partner');
    const deductionAlimonySpouse = getInputValue('deduction-alimony-spouse');
    const deductionAlimonyPartner = getInputValue('deduction-alimony-partner');

    const totalIncomePartner = salary1Partner + salary2Partner + businessIncomePartner + rentalIncomePartner + disabilityAllowancePartner + alimonyPartner - deductionAlimonyPartner;
    const totalIncomeSpouse = salary1Spouse + salary2Spouse + businessIncomeSpouse + rentalIncomeSpouse + disabilityAllowanceSpouse + alimonySpouse - deductionAlimonySpouse;

    const totalIncome = totalIncomePartner + totalIncomeSpouse;

    document.getElementById('total-income-partner').textContent = `₪${totalIncomePartner.toLocaleString()}`;
    document.getElementById('total-income-spouse').textContent = `₪${totalIncomeSpouse.toLocaleString()}`;
    document.getElementById('total-income').textContent = `₪${totalIncome.toLocaleString()}`;

    const availableMortgage = totalIncome * 0.33; // 33% מההכנסה המשפחתית
    document.getElementById('available-mortgage').textContent = `₪${availableMortgage.toLocaleString()}`;

    // Block 2: חישוב הלוואות
    const loanBalance1 = getInputValue('loan1');
    const loanBalance2 = getInputValue('loan2');
    const loanBalance3 = getInputValue('loan3');
    const loanBalance4 = getInputValue('loan4');
    const loanBalance5 = getInputValue('loan5');
    const loanBalance6 = getInputValue('loan6');
    const totalLoans = loanBalance1 + loanBalance2 + loanBalance3 + loanBalance4 + loanBalance5 + loanBalance6;
    document.getElementById('total-loans').textContent = `₪${totalLoans.toLocaleString()}`;

    const monthlyPayment1 = getInputValue('loan1-monthly');
    const monthlyPayment2 = getInputValue('loan2-monthly');
    const monthlyPayment3 = getInputValue('loan3-monthly');
    const monthlyPayment4 = getInputValue('loan4-monthly');
    const monthlyPayment5 = getInputValue('loan5-monthly');
    const monthlyPayment6 = getInputValue('loan6-monthly');
    const totalMonthlyPayment = monthlyPayment1 + monthlyPayment2 + monthlyPayment3 + monthlyPayment4 + monthlyPayment5 + monthlyPayment6;
    document.getElementById('total-monthly-payment').textContent = `₪${totalMonthlyPayment.toLocaleString()}`;

    const availableMortgageAfterLoans = availableMortgage - totalMonthlyPayment;
    document.getElementById('available-mortgage-after-loans').textContent = `₪${availableMortgageAfterLoans.toLocaleString()}`;

    // חישוב משכנתא מאושרת
    const mortgageWithoutLoans = (availableMortgage / 550) * 100000;
    document.getElementById('approved-amount-without-loans').textContent = `₪${mortgageWithoutLoans.toLocaleString()}`;

    const mortgageWithLoans = (availableMortgageAfterLoans / 550) * 100000;
    document.getElementById('approved-amount-with-loans').textContent = `₪${mortgageWithLoans.toLocaleString()}`;

    // Block 3: חישוב הון אישי ותשלומים
    const personalCapital = getInputValue('personal-capital');
    const lockedCapitalLoan = getInputValue('locked-capital-loan');
    const governmentLoan = getInputValue('government-loan');
    const financialPlatformsCapital = getInputValue('financial-platforms-capital');
    const otherCapital1 = getInputValue('other-capital-1');
    const otherCapital2 = getInputValue('other-capital-2');

    const totalCapital = personalCapital + lockedCapitalLoan + governmentLoan + financialPlatformsCapital + otherCapital1 + otherCapital2;
    document.getElementById('total-capital').textContent = `₪${totalCapital.toLocaleString()}`;

    // חישוב סה"כ הוצאות
    const operationalExpenses = getInputValue('operational-expenses');
    const taxExpenses = getInputValue('tax-expenses');
    const enhancementExpenses = getInputValue('enhancement-expenses');

    const totalExpenses = operationalExpenses + taxExpenses + enhancementExpenses;
    document.getElementById('total-expenses').textContent = `₪${totalExpenses.toLocaleString()}`;

    // חישוב הון עצמי נטו לאחר הוצאות
    const netCapital = totalCapital - totalExpenses;
    document.getElementById('net-capital').textContent = `₪${netCapital.toLocaleString()}`;

    // חישוב משכנתא מאושרת על פי הון עצמי
    const approvedMortgageFirstHome = netCapital * 4;
    document.getElementById('approved-mortgage-first-home').textContent = `₪${approvedMortgageFirstHome.toLocaleString()}`;

    const approvedMortgageSecondHome = netCapital * 2;
    document.getElementById('approved-mortgage-second-home').textContent = `₪${approvedMortgageSecondHome.toLocaleString()}`;

    // חישוב סכום משכנתא
    const mortgageAmountFirstHome = approvedMortgageFirstHome - netCapital;
    const mortgageAmountSecondHome = approvedMortgageSecondHome - netCapital;

    // חישוב סך תקציב לביצוע השקעה על פי הון עצמי
    const totalBudgetFirstHome = mortgageAmountFirstHome + netCapital;
    document.getElementById('total-budget-first-home').textContent = `₪${totalBudgetFirstHome.toLocaleString()}`;

    const totalBudgetSecondHome = mortgageAmountSecondHome + netCapital;
    document.getElementById('total-budget-second-home').textContent = `₪${totalBudgetSecondHome.toLocaleString()}`;

    // חישוב סך תקציב לביצוע השקעה על פי פרמטר יכולת החזר
    const totalBudgetWithoutLoans = mortgageWithoutLoans + totalCapital;
    document.getElementById('mortgage-and-capital-without-loans').textContent = `₪${totalBudgetWithoutLoans.toLocaleString()}`;

    const totalBudgetWithLoans = mortgageWithLoans + totalCapital;
    document.getElementById('mortgage-and-capital-with-loans').textContent = `₪${totalBudgetWithLoans.toLocaleString()}`;

    // Block 4: חישוב מינוף
    calculateLeverage('75');
    calculateLeverage('60');
    calculateLeverage('40');

    // Block 5: חישובים סופיים
    document.getElementById('final-total-income').textContent = `₪${totalIncome.toLocaleString()}`;
    document.getElementById('final-total-loans').textContent = `₪${totalLoans.toLocaleString()}`;
    document.getElementById('final-total-monthly-loan-payment').textContent = `₪${totalMonthlyPayment.toLocaleString()}`;
    document.getElementById('final-total-capital-and-costs').textContent = `₪${totalCapital.toLocaleString()}`;
}

// פונקציה לחישוב מינוף
function calculateLeverage(idSuffix) {
    const leverage = parseFloat(idSuffix) / 100;
    const propertyValue = getInputValue(`property-value-${idSuffix}`);
    const equity = propertyValue * (1 - leverage);
    const mortgage = propertyValue * leverage;
    const monthlyMortgagePayment = (mortgage / 100000) * 550; // הנחה: 550 תשלומים
    document.getElementById(`equity-${idSuffix}`).textContent = `₪${equity.toLocaleString()}`;
    document.getElementById(`mortgage-${idSuffix}`).textContent = `₪${mortgage.toLocaleString()}`;
    document.getElementById(`monthly-mortgage-payment-${idSuffix}`).textContent = `₪${monthlyMortgagePayment.toLocaleString()}`;
}

// פונקציה לאיפוס המחשבון
function resetCalculator() {
    // איפוס כל שדות הקלט
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
        input.classList.remove('input-error');
    });
    // איפוס כל התוצאות
    document.querySelectorAll('span[id]').forEach(span => {
        span.textContent = '₪';
    });
    document.querySelectorAll('td[id]').forEach(td => {
        td.textContent = '₪';
    });
}
