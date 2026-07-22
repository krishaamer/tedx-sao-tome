//
//  AppDelegate.swift
//  Y
//
//  Created by Kris Haamer on 04.06.15.
//  Copyright (c) 2015 HAAM. All rights reserved.
//

import UIKit
import Bolts
import Parse
import ParseUI

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        
        Parse.setApplicationId("FdGtmrWpy44MtWDCMi3hs3r0SKoEn32DxJ8hHvx5", clientKey: "iFcSbKlTvSffdUoxXXBgm9Ppj5viMX5mnFCgHAez")
        self.window!.rootViewController = self.generateOnboardingViewController()

        return true
    }
    
    func generateOnboardingViewController() -> OnboardingViewController {
   
        let firstPage: OnboardingContentViewController = OnboardingContentViewController(title: "", body: "", image: UIImage(named:
            "blue"), buttonText: "Bem-vindos") {
                //nothing
        }
        firstPage.movesToNextViewController = true;
        
        let secondPage: OnboardingContentViewController = OnboardingContentViewController(title: "O Evento", body: "O TEDxSãoTomé foi criado no espírito de missão TED, “ideias que merecem ser partilhadas”. O programa foi criado para oferecer às comunidades, organizações e indivíduos em e de São Tomé e Príncipe, a oportunidade de promover o diálogo através de experiências TED no país.", image: UIImage(named: "empty"), buttonText: "Continuar") {
                //nothing
        }
        secondPage.movesToNextViewController = true;

        let thirdPage: OnboardingContentViewController = OnboardingContentViewController(title: "", body: "", image: UIImage(named:
            "yellow"), buttonText: "Começar") {
                self.handleOnboardingCompletion()
        }
        
        let onboardingVC: OnboardingViewController = OnboardingViewController(backgroundImage: UIImage(named: "street"), contents: [firstPage,secondPage,thirdPage])
        
   
        onboardingVC.shouldFadeTransitions = true
        onboardingVC.fontName = "Helvetica-Light";
        onboardingVC.titleFontSize = 26;
        onboardingVC.bodyFontSize = 23;
        onboardingVC.topPadding = 0;
        onboardingVC.underIconPadding = 10;
        onboardingVC.underTitlePadding = 15;
        onboardingVC.bottomPadding = 0;
        
        return onboardingVC
    }
    
    func handleOnboardingCompletion() {
        setupNormalRootVC()
    }
    
    func setupNormalRootVC() {
        
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let vc: MainTabBarController = storyboard.instantiateViewControllerWithIdentifier("MainTabBarController") as! MainTabBarController

        UIView.transitionWithView(self.window!, duration: 0.5, options:.TransitionCrossDissolve, animations: { () -> Void in self.window!.rootViewController = vc
            }, completion:nil)
        }
}

