# Graphs and Glucose: Predicting Diabetes Using Machine Learning

## Authors
Matthew Nguyen, Jessica Wang, Madelyn Lee

## Project Overview
This project explores the relationship between various health factors and the likelihood of developing diabetes. By leveraging machine learning models, we aim to uncover key insights that could lead to better prevention strategies, earlier diagnosis, and personalized treatment plans.

## Motivation
Diabetes is a significant global health concern, with its prevalence steadily increasing. This project investigates the following:
- The factors most influencing diabetes risk.
- The correlation between body mass index (BMI) and diabetes.
- How accurately machine learning models can predict diabetes.
- The most effective machine learning models for prediction.

## Research Questions
1. **What factors most influence a person's disposition to developing diabetes?**  
   Higher HbA1C levels and blood glucose levels are closely linked with diabetes.
2. **How accurately can we predict diabetes based on basic health statistics?**  
   Models achieve an average accuracy of 89.7%.
3. **Is there a correlation between BMI and diabetes?**  
   BMI correlates with diabetes when coupled with age.
4. **Which model most accurately predicts diabetes?**  
   The Random Forest model achieved the highest accuracy of 97.3%.

## Methodology
This project utilizes multiple machine learning models, including:
- Logistic Regression
- Decision Trees
- Random Forests

Data preprocessing, visualization, and model evaluation were conducted using Python libraries such as `numpy`, `pandas`, `matplotlib`, and `scikit-learn`.

## Results
- The Random Forest model outperformed other models with an accuracy of 97.3%.
- Key health factors such as HbA1C levels and blood glucose were identified as significant predictors.
- Combined attributes like BMI and age provided better predictive insights.
