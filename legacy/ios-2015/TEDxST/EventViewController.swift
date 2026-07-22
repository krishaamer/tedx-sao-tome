//
//  EventViewController.swift
//  TEDxST
//
//  Created by Kris Haamer on 08.07.15.
//  Copyright © 2015 Kris Haamer. All rights reserved.
//

import UIKit

class EventViewController: UIViewController {
    
    @IBOutlet weak var scrollView: UIScrollView!

    override func viewDidLoad() {
        self.scrollView.alpha = 0.0
        
        super.viewDidLoad()
    }
    
    override func viewWillAppear(animated: Bool) {
        
        self.scrollView.contentSize.height=1500
        self.scrollView.fadeIn()
        
        super.viewWillAppear(animated)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}