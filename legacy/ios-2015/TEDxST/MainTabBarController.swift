//
//  MainTabBarController.swift
//  Y
//
//  Created by Kris Haamer on 06.06.15.
//  Copyright (c) 2015 HAAM. All rights reserved.
//

import UIKit
import Bolts
import Parse
import ParseUI

class MainTabBarController: UITabBarController {
    
    @IBOutlet weak var tabs: UITabBar!
    
    override func viewDidLoad() {
        
        let tabBarItem0 = self.tabs.items![0] as! UITabBarItem
        let tabBarItem1 = self.tabs.items![1] as! UITabBarItem
        let tabBarItem2 = self.tabs.items![2] as! UITabBarItem
        let tabBarItem3 = self.tabs.items![3] as! UITabBarItem
        
        tabBarItem0.title = "Evento"
        tabBarItem0.image = UIImage.fontAwesomeIconWithName(FontAwesome.Calendar, textColor: UIColor.blackColor(), size: CGSizeMake(30, 30))
        
        tabBarItem1.title = "Oradores"
        tabBarItem1.image = UIImage.fontAwesomeIconWithName(FontAwesome.Globe, textColor: UIColor.blackColor(), size: CGSizeMake(30, 30))
        
        tabBarItem2.title = "Mensagens"
        tabBarItem2.image = UIImage.fontAwesomeIconWithName(FontAwesome.Comments, textColor: UIColor.blackColor(), size: CGSizeMake(30, 30))
        
        tabBarItem3.title = "Sobre"
        tabBarItem3.image = UIImage.fontAwesomeIconWithName(FontAwesome.InfoCircle, textColor: UIColor.blackColor(), size: CGSizeMake(30, 30))
        
        super.viewDidLoad()
    }
}